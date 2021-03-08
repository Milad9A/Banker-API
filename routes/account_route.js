const express = require('express')
const AccountController = require('../controllers/account_controller')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/accounts', auth, AccountController.createAccount)

router.get('/accounts/me', auth, AccountController.getMyAccounts)

router.get('/accounts/:id', auth, AccountController.getAccount)

router.patch('/accounts/:id', auth, AccountController.updateAccount)

router.delete('/accounts/:id', auth, AccountController.deleteAccount)

module.exports = router
