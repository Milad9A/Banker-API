const Payment = require('../models/payment_model')

const PaymentController = {
    createPayment: async (req, res) => {
        const payment = new Payment({
            ...req.body,
            user: req.user._id,
        })

        if (payment.amount > req.user.balance)
            return res.status(402).send({
                error:
                    'Insufficient funds. Unable to complete the payment process',
            })
        else req.user.balance -= payment.amount

        try {
            await payment.save()
            await req.user.save()

            await payment.populate('user').execPopulate()

            res.status(201).send(payment)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    getMyPayments: async (req, res) => {
        try {
            await req.user
                .populate({ path: 'payments', populate: { path: 'user' } })
                .execPopulate()
            res.send(req.user.payments)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    getMyPayment: async (req, res) => {
        const _id = req.params.id
        try {
            const payment = await Payment.findOne({
                _id,
                user: req.user._id,
            })

            if (!payment) return res.status(404).send()

            await payment.populate('user').execPopulate()

            res.send(payment)
        } catch (error) {
            res.status(500).send()
        }
    },
}

module.exports = PaymentController
