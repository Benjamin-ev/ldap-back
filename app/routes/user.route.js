const express = require('express')
const router = express.Router()

const {
    createUser,
    modifyUser
} = require('../controllers/user.controller.js')

router.post('/', createUser)

router.put('/', modifyUser)

module.exports = router