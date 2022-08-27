const express = require('express')
const router = express.Router()

const  {
    getAllUsers,
    getUser,
    createUser,
    createUsers,
    modifyUser,
    modifyUsers,
    modifyPass,
    modifyMultiplePass,
    deleteUser
} = require('../controllers/users.controller.js')

router.get('/', getAllUsers)

router.get('/user/:userId', getUser)

router.post('/', createUser)

router.post('/users', createUsers)

router.put('/', modifyUser)

router.put('/users', modifyUsers)

router.patch('/', modifyPass)

router.patch('/users', modifyMultiplePass)

router.delete('/', deleteUser)

module.exports = router