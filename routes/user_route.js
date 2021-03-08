const express = require('express')
const UserController = require('../controllers/user_controller')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/users', UserController.createUser)

router.post('/users/login', UserController.loginUser)

router.post('/users/logout', auth, UserController.logoutUser)

router.post('/users/logoutAll', auth, UserController.logoutUserFromAll)

router.get('/users/me', auth, UserController.getUserMe)

router.patch('/users/me', auth, UserController.updateUserMe)

router.delete('/users/me', auth, UserController.deleteUserMe)

module.exports = router
