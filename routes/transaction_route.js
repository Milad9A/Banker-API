const express = require('express')
const TransactionController = require('../controllers/transaction_controller')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post(
    '/transactions/withdrawal',
    auth,
    TransactionController.createWithdrawalTransaction
)

router.post(
    '/transactions/deposit',
    auth,
    TransactionController.createDepositTransaction
)

router.get('/transactions', auth, TransactionController.getMyTransactions)

router.get('/transactions/:id', auth, TransactionController.getMyTransaction)

module.exports = router
