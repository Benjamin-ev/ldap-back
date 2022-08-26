const ldap = require('../ldap/ldap')
const ldapjs = require('ldapjs')

const getAllGroups = ((req, res) => {
    try {
        client = ldap.connexion()
        ldap.searchLDAP(client, 'cn=*', 'ou=groups, dc=boquette, dc=fr')
        .then(output => {
            res.send(output)
        })
    } catch (err) {
        res.sendStatus(500)
    }
})

const getGroup = ((req, res) => {
    try {
        client = ldap.connexion()
        ldap.searchLDAP(client, 'cn='+req.params.groupId, 'ou=groups, dc=boquette, dc=fr')
        .then(output => {
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

        client = ldap.connexion()
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
            client.add('cn='+group.cn+',ou=groups,dc=boquette,dc=fr', entry, () => {})
            client.unbind()
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

        client = ldap.connexion()
        new Promise((resolve, reject) => {
            client.bind('cn='+process.env.LDAP_CN+',dc=boquette,dc=fr', process.env.LDAP_PASSWORD, (err) => {console.log(err)})

            for (let key in group) {
                const modif = Object.fromEntries(new Map().set(key, group[key]))
                ldap.modifyLDAP(client, modif, 'cn='+group.cn+',ou=groups,dc=boquette,dc=fr')
            }
            client.unbind()
        })
        .then(res.sendStatus(200))
    } catch (err) {
        res.sendStatus(500)
    }
})

const updateGroups = ((req, res) => {
    try {
        const uid = req.body.user
        const cn = req.body.cn
        const action = req.body.action

        client = ldap.connexion()
        
        new Promise((resolve, reject) => {
            client.bind('cn='+process.env.LDAP_CN+',dc=boquette,dc=fr', process.env.LDAP_PASSWORD, () => {})
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
            client.modify('cn='+cn+',ou=groups,dc=boquette,dc=fr', change, () => {resolve()})
            client.unbind()
        })
        .then(res.sendStatus(200))
    } catch (err) {
        res.sendStatus(500)
    }
})

const deleteGroup = ((req, res) => {
    try {
        req.setEncoding('utf8')

        const group = req.body.dn

        client = ldap.connexion()
        client.bind('cn='+process.env.LDAP_CN+',dc=boquette,dc=fr', process.env.LDAP_PASSWORD, () => {})
        client.del(group, () => {})
        client.unbind()

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

