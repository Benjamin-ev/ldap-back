const express = require('express')
const router = express.Router()

const  {
    getAllGroups,
    getGroup,
    getBouls,
    createGroup,
    modifyGroup,
    updateBouls,
    updateGroups,
    transfertGroup,
    deleteGroup,
    deleteUsers
} = require('../controllers/groups.controller.js')

router.get('/', getAllGroups)

router.get('/group/:groupId', getGroup)

router.get('/bouls/:groupId', getBouls)

router.post('/', createGroup)

router.put('/', modifyGroup)

router.put('/bouls', updateBouls)

router.patch('/', updateGroups)

router.patch('/transfert', transfertGroup)

router.delete('/', deleteGroup)

router.delete('/all', deleteUsers)

module.exports = router