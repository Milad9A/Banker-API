const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        balance: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
)

const Account = mongoose.model('Account', accountSchema)

module.exports = Account
