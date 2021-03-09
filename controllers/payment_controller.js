const Account = require('../models/account_model')
const Payment = require('../models/payment_model')

const PaymentController = {
    createPayment: async (req, res) => {
        const payment = new Payment({
            ...req.body,
            user_id: req.user._id,
            account_id: req.params.id,
        })

        const account = await Account.findById(req.params.id)

        if (payment.amount > account.balance)
            return res.status(402).send({
                error:
                    'Insufficient funds. Unable to complete the payment process',
            })
        else account.balance -= payment.amount

        try {
            await payment.save()
            await account.save()

            res.status(201).send(payment)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    getMyPayments: async (req, res) => {
        try {
            await req.user.populate('payments').execPopulate()
            res.send(req.user.payments)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    getMyAccountPayments: async (req, res) => {
        try {
            await req.user
                .populate({
                    path: 'payments',
                    match: { account_id: req.params.id },
                })
                .execPopulate()

            const payments = req.user.payments

            res.send(payments)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    getMyPayment: async (req, res) => {
        const _id = req.params.id
        try {
            const payment = await Payment.findOne({
                _id,
                user_id: req.user._id,
            })

            if (!payment) return res.status(404).send()

            res.send(payment)
        } catch (error) {
            res.status(500).send()
        }
    },
}

module.exports = PaymentController
