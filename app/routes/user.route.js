const express = require('express')
const router = express.Router()

const {
    getUser,
    createUser,
    modifyUser
} = require('../controllers/user.controller.js')

router.get('/', getUser)

// router.post('/', createUser)

router.put('/', modifyUser)

module.exports = router