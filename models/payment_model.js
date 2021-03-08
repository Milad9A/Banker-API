const mongoose = require('mongoose')
const validator = require('validator')

const paymentSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        account_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Account',
        },
        name: {
            type: String,
            default: 'Default Payment Name',
        },
        amount: {
            type: Number,
            required: true,
            validate(value) {
                if (value < 0)
                    throw new Error('Payment Amount must be a positive number')
            },
        },
        url: {
            type: String,
            required: true,
            validate(value) {
                if (!validator.isURL(value)) throw new Error('URL is invalid')
            },
        },
    },
    {
        timestamps: true,
    }
)

const Payment = mongoose.model('Payment', paymentSchema)

module.exports = Payment
