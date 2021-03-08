const express = require('express')
const PaymentController = require('../controllers/payment_controller')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/accounts/:id/payments', auth, PaymentController.createPayment)

router.get('/payments', auth, PaymentController.getMyPayments)

router.get(
    '/accounts/:id/payments',
    auth,
    PaymentController.getMyAccountPayments
)

router.get('/payments/:id', auth, PaymentController.getMyPayment)

module.exports = router
