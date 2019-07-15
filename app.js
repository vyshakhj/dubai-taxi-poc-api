const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const QRCode = require('qrcode');
const { Booking } = require("./models/booking");

mongoose.connect(process.env.MONGO)
  .then(() => console.log('Connected to database!'))
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.post('/api/customer/bookings', (req, res) => {
  const bookingId = `BK-${new Date().getFullYear()}-${new Date().getMonth()}${new Date().getMinutes()}${new Date().getMilliseconds()}`;
  QRCode.toDataURL(`BookingId: ${bookingId}\nBookingType: ${req.body.bookingType}\nDestination: ${req.body.destination}\nBookingId: BK001/295`,
    { errorCorrectionLevel: 'H' })
    .then(async code => {

      let booking = new Booking({
        bookingId: bookingId,
        bookingType: req.body.bookingType,
        scheduledTime: req.body.scheduledTime,
        mobileNumber: req.body.mobileNumber,
        destination: req.body.destination,
        vehicleType: req.body.vehicleType,
        passgengersCount: req.body.passgengersCount,
        bagsCount: req.body.bagsCount,
        qrCode: code
      });

      await booking.save();

      res.status(201).json({
        message: 'Booking added successfully!',
        qrCode: code
      });
    })
    .catch(err => {
      console.error(err)
    })
});

app.get('/api/bookings', async (req, res) => {
  const bookings = await Booking.find().select("-__v");
  res.send({ message: 'Bookings', bookings: bookings })
});

module.exports = app;
