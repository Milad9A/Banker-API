const Account = require('../models/account_model')

const AccountController = {
    createAccount: async (req, res) => {
        const account = new Account({
            ...req.body,
            user_id: req.user._id,
        })

        try {
            await account.save()
            res.status(201).send(account)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    getMyAccounts: async (req, res) => {
        try {
            await req.user.populate('accounts').execPopulate()
            res.send(req.user.accounts)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    getAccount: async (req, res) => {
        const _id = req.params.id
        try {
            const account = await Account.findOne({
                _id,
                user_id: req.user._id,
            })

            if (!account) return res.status(404).send()

            res.send(account)
        } catch (error) {
            res.status(500).send()
        }
    },

    updateAccount: async (req, res) => {
        const updates = Object.keys(req.body)

        try {
            const account = await Account.findOne({
                _id: req.params.id,
                user_id: req.user._id,
            })

            if (!account) return res.status(404).send()

            updates.forEach((update) => (account[update] = req.body[update]))

            await account.save()

            res.send(account)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    deleteAccount: async (req, res) => {
        try {
            const account = await Account.findOneAndDelete({
                _id: req.params.id,
                user_id: req.user._id,
            })

            if (!account) return res.status(404).send()

            res.send(account)
        } catch (error) {
            res.status(500).send()
        }
    },
}

module.exports = AccountController
