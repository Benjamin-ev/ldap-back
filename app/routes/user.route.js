const express = require('express')
const router = express.Router()

const {
    getUser,
    createUser,
    modifyUser,
    resetPassword
} = require('../controllers/user.controller.js')

router.get('/', getUser)

// router.post('/', createUser)

router.put('/', modifyUser)

router.patch('/', resetPassword)

module.exports = router