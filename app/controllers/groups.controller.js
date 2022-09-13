const ldap = require('../ldap/ldap')

const getAllGroups = ((req, res) => {
    try {
        var client = ldap.connexion()
        ldap.searchLDAP(client, 'cn=*', 'ou=groups, dc=boquette, dc=fr')
        .then(output => {
            client.destroy()
            res.send(output)
        })
    } catch (err) {
        res.sendStatus(500)
    }
})

const getGroup = ((req, res) => {
    try {
        var client = ldap.connexion()
        ldap.searchLDAP(client, 'cn='+req.params.groupId, 'ou=groups, dc=boquette, dc=fr')
        .then(output => {
            client.destroy()
            res.send(output)
        })
    } catch (err) {
        res.sendStatus(500)
    }
})

const getBouls = ((req, res) => {
    try {
        var client = ldap.connexion()
        ldap.searchLDAP(client, 'bouls='+req.params.groupId+':*', 'ou=people,dc=boquette,dc=fr')
        .then(output => {
            client.destroy()
            res.send(output)
        })
    } catch (err) {
        res.sendStatus(500)
    }
})

const createGroup = ((req, res) => {
    try {
        req.setEncoding('utf-8')

        const group = req.body

        var client = ldap.connexion()
        new Promise(function(resolve,reject) {
            var opts = {
                filter: 'cn=*',
                scope: 'sub'
            }
            client.search('ou=groups, dc=boquette, dc=fr', opts, (err, response) => {
                if (err == undefined) {
                    var output = []
                    response.on('searchEntry', (entry) => {
                        output.push(entry.object.gidNumber)
                    })
                    response.on('end', () => {
                        resolve(parseInt(output.sort().pop())+1)
                    })
                }
            })
        })
        .then(gidNumber => {
            client.bind('cn='+process.env.LDAP_CN+',dc=boquette,dc=fr', process.env.LDAP_PASSWORD, () => {})

            const entry = {
                objectClass: ['boquetteGroups','posixGroup'],
                gidNumber: gidNumber.toString(),
                description: group.description,
                strass: group.strass
            }
            client.add('cn='+group.cn+',ou=groups,dc=boquette,dc=fr', entry, (err) => {client.destroy()})
        })
        .then(res.sendStatus(200))
    } catch (err) {
        res.sendStatus(500)
    }
})

const modifyGroup = ((req, res) => {
    try {
        req.setEncoding('utf-8')

        const group = req.body

        for (let key in group) {
            const modif = Object.fromEntries(new Map().set(key, group[key]))

            ldap.modifyLDAP('replace', modif, 'cn='+group.cn+',ou=groups,dc=boquette,dc=fr')
        }

        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(500)
    }
})

const addUsers = ((req, res) => {
    try {
        req.setEncoding('utf-8')

        const users = req.body.users

        for (let i = 0; i < users.length; i++) {
            var user = users[i]

            ldap.modifyLDAP('add', {memberUid: user}, 'cn='+req.body.cn+',ou=groups,dc=boquette,dc=fr')
        }

        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(500)
    }
})

const updateGroups = ((req, res) => {
    try {
        req.setEncoding('utf-8')

        ldap.modifyLDAP(req.body.action, {memberUid: req.body.user}, 'cn='+req.body.cn+',ou=groups,dc=boquette,dc=fr')

        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(500)
    }
})

const updateBouls = ((req, res) => {
    try {
        req.setEncoding('utf-8')

        ldap.modifyLDAP(req.body.action, {bouls: req.body.bouls}, 'uid='+req.body.uid+',ou=people,dc=boquette,dc=fr')

        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(500)
    }
})

const transfertGroup = ((req, res) => {
    try {
        req.setEncoding('utf-8')

        var client = ldap.connexion()
        ldap.searchLDAP(client, 'cn='+req.body.oldGroup, 'ou=groups, dc=boquette, dc=fr')
        .then(output => {
            client.destroy()

            const members = output[0].memberUid

            for (let i = 0; i < members.length; i++) {
                var user = members[i]

                ldap.modifyLDAP('add', {memberUid: user}, 'cn='+req.body.newGroup+',ou=groups, dc=boquette, dc=fr')

                if (!req.body.action) {
                    ldap.modifyLDAP('delete', {memberUid: user}, 'cn='+req.body.oldGroup+',ou=groups, dc=boquette, dc=fr')
                }
            }
        })

        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(500)
    }
})

const deleteGroup = ((req, res) => {
    try {
        req.setEncoding('utf8')

        const group = req.body.dn

        ldap.delLDAP(group)

        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(500)
    }
})

const deleteUsers = ((req, res) => {
    try {
        req.setEncoding('utf-8')

        const users = req.body.memberUid

        for (let i = 0; i < users.length; i++) {
            var user = users[i]

            ldap.modifyLDAP('delete', {memberUid: user}, 'cn='+req.body.cn+',ou=groups,dc=boquette,dc=fr')
        }

        res.sendStatus(200)
    } catch (err) {

    }
})

module.exports = {
    getAllGroups,
    getGroup,
    getBouls,
    createGroup,
    modifyGroup,
    addUsers,
    updateGroups,
    updateBouls,
    transfertGroup,
    deleteGroup,
    deleteUsers
}

