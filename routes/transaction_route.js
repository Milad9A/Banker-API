const express = require('express')
const TransactionController = require('../controllers/transaction_controller')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post(
    '/accounts/:id/transactions/withdrawal',
    auth,
    TransactionController.createWithdrawalTransaction
)

router.post(
    '/accounts/:id/transactions/deposit',
    auth,
    TransactionController.createDepositTransaction
)

router.get('/transactions', auth, TransactionController.getMyTransactions)

router.get(
    '/accounts/:id/transactions',
    auth,
    TransactionController.getMyAccountTransactions
)

router.get('/transactions/:id', auth, TransactionController.getMyTransaction)

module.exports = router
