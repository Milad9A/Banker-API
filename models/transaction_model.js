const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        amount: {
            type: Number,
            required: true,
            validate(value) {
                if (value < 0)
                    throw new Error(
                        'Transaction Amount must be a positive number'
                    )
            },
        },
        type: {
            type: String,
            enum: ['withdrawal', 'deposit'],
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction
