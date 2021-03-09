const Transaction = require('../models/transaction_model')

const TransactionController = {
    createWithdrawalTransaction: async (req, res) => {
        const transaction = new Transaction({
            ...req.body,
            type: 'withdrawal',
            user: req.user._id,
        })

        if (transaction.amount > req.user.balance)
            return res.status(402).send({
                error:
                    'Insufficient funds. Unable to complete the withdrawal process',
            })
        else req.user.balance -= transaction.amount

        try {
            await transaction.save()
            await req.user.save()

            await transaction.populate('user').execPopulate()

            res.status(201).send(transaction)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    createDepositTransaction: async (req, res) => {
        const transaction = new Transaction({
            ...req.body,
            type: 'deposit',
            user: req.user._id,
        })

        req.user.balance += transaction.amount

        try {
            await transaction.save()
            await req.user.save()

            await transaction.populate('user').execPopulate()

            res.status(201).send(transaction)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    getMyTransactions: async (req, res) => {
        try {
            await req.user
                .populate({
                    path: 'transactions',
                    populate: {
                        path: 'user',
                    },
                })
                .execPopulate()
            res.send(req.user.transactions)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    getMyTransaction: async (req, res) => {
        const _id = req.params.id
        try {
            const transaction = await Transaction.findOne({
                _id,
                user: req.user._id,
            })

            if (!transaction) return res.status(404).send()

            await transaction.populate('user').execPopulate()

            res.send(transaction)
        } catch (error) {
            res.status(500).send()
        }
    },
}

module.exports = TransactionController
