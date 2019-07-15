const mongoose = require('mongoose');

const Booking = mongoose.model('booking', new mongoose.Schema({
    bookingId: {
        type: String,
        required: true
    },
    bookingType: {
        type: String,
        required: true
    },
    scheduledTime: {
        type: String,
        required: false
    },
    mobileNumber: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    vehicleType: {
        type: String,
        required: true
    },
    passgengersCount: {
        type: Number,
        required: true
    },
    bagsCount: {
        type: Number,
        required: true
    },
    qrCode: {
        type: String,
        required: false
    },
}));

exports.Booking = Booking;