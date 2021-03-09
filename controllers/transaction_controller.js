const Account = require('../models/account_model')
const Transaction = require('../models/transaction_model')

const TransactionController = {
    createWithdrawalTransaction: async (req, res) => {
        const transaction = new Transaction({
            ...req.body,
            type: 'withdrawal',
            user_id: req.user._id,
            account_id: req.params.id,
        })

        const account = await Account.findById(req.params.id)

        if (transaction.amount > account.balance)
            return res.status(402).send({
                error:
                    'Insufficient funds. Unable to complete the withdrawal process',
            })
        else account.balance -= transaction.amount

        try {
            await transaction.save()
            await account.save()

            res.status(201).send(transaction)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    createDepositTransaction: async (req, res) => {
        const transaction = new Transaction({
            ...req.body,
            type: 'deposit',
            user_id: req.user._id,
            account_id: req.params.id,
        })

        const account = await Account.findById(req.params.id)

        account.balance += transaction.amount

        try {
            await transaction.save()
            await account.save()

            res.status(201).send(transaction)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    getMyTransactions: async (req, res) => {
        try {
            await req.user.populate('transactions').execPopulate()
            res.send(req.user.transactions)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    getMyAccountTransactions: async (req, res) => {
        try {
            await req.user
                .populate({
                    path: 'transactions',
                    match: { account_id: req.params.id },
                })
                .execPopulate()

            const transactions = req.user.transactions

            res.send(transactions)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    getMyTransaction: async (req, res) => {
        const _id = req.params.id
        try {
            const transaction = await Transaction.findOne({
                _id,
                user_id: req.user._id,
            })

            if (!transaction) return res.status(404).send()

            res.send(transaction)
        } catch (error) {
            res.status(500).send()
        }
    },
}

module.exports = TransactionController
