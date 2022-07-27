const express = require('express')
const router = express.Router()

const  {
    getAllGroups,
    getGroup,
    createGroup,
    modifyGroup,
    updateGroups,
    deleteGroup
} = require('../controllers/groups.controller.js')

router.get('/', getAllGroups)

router.get('/group/:groupId', getGroup)

router.post('/', createGroup)

router.put('/', modifyGroup)

router.patch('/', updateGroups)

router.delete('/', deleteGroup)

module.exports = router