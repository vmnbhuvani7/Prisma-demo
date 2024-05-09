const express = require('express');
const router = express.Router();
const { signUp, login, logout } = require('../controllers/userControllers')

router.route('/signup').post(signUp)
router.route('/login').get(login)
router.route('/logout').get(logout)

module.exports = router