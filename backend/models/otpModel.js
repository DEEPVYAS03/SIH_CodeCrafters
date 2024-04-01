const { Schema, model, default: mongoose } = require("mongoose");

const OtpSchema =new Schema({
    number: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: { type: Date, default: Date.now, index: { expires: 600 } }

    // After 5 minutes it will be deleted automatically from the database
}, { timestamps: true })

module.exports = mongoose.model('Otp', OtpSchema)