const express = require('express')
const router = express.Router()

const  { 
    setToken
} = require('../controllers/auth.controller.js')

router.post('/', setToken)

module.exports = router