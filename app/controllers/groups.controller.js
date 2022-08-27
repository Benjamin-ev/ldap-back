const ldap = require('../ldap/ldap')
const ldapjs = require('ldapjs')

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
            
            var client = ldap.connexion()
            client.bind('cn='+process.env.LDAP_CN+',dc=boquette,dc=fr', process.env.LDAP_PASSWORD, () => {})
            ldap.modifyLDAP(client, modif, 'cn='+group.cn+',ou=groups,dc=boquette,dc=fr')
        }

        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(500)
    }
})

const updateGroups = ((req, res) => {
    try {
        const uid = req.body.user
        const cn = req.body.cn
        const action = req.body.action

        var change
        if (action == "del") {
            change = new ldapjs.Change({
                operation: 'delete',
                modification: {
                    memberUid: uid
                }
            })
        } else if (action == "add") {
            change = new ldapjs.Change({
                operation: 'add',
                modification: {
                    memberUid: uid
                }
            })
        } else {
            res.sendStatus(404)
        }

        var client = ldap.connexion()
        client.bind('cn='+process.env.LDAP_CN+',dc=boquette,dc=fr', process.env.LDAP_PASSWORD, () => {})
        client.modify('cn='+cn+',ou=groups,dc=boquette,dc=fr', change, (err) => {client.destroy()})

        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(500)
    }
})

const deleteGroup = ((req, res) => {
    try {
        req.setEncoding('utf8')

        const group = req.body.dn

        var client = ldap.connexion()
        client.bind('cn='+process.env.LDAP_CN+',dc=boquette,dc=fr', process.env.LDAP_PASSWORD, () => {})
        client.del(group, (err) => {client.destroy()})

        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(500)
    }
})

module.exports = {
    getAllGroups,
    getGroup,
    createGroup,
    modifyGroup,
    updateGroups,
    deleteGroup
}

