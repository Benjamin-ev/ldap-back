var ldap = require('ldapjs')

const connexion = (() => {
    const client = ldap.createClient({
        url: 'ldap://'+process.env.LDAP_IP
    })
    client.on('error', (err) => {
        console.log("Connexion error : " + err)
    })
    return client
})

const getAllGroups = ((req, res) => {
    try {
        client = connexion()
        searchLDAP(client, 'cn=*', 'ou=groups, dc=boquette, dc=fr')
        .then(output => res.send(output))
    } catch (err) {
        res.sendStatus(500)
    }
})

const getGroup = ((req, res) => {
    try {
        client = connexion()
        searchLDAP(client, 'cn='+req.params.groupId, 'ou=groups, dc=boquette, dc=fr')
        .then(output => res.send(output))
    } catch (err) {
        res.sendStatus(500)
    }
})

const searchLDAP = function(client, filter, dn) {
    return new Promise((resolve, reject) => {
        var opts = {
            filter: filter,
            scope: 'sub'
        }
        client.search(dn, opts, (err, response) => {
            if (!err) {
                var output = []
                response.on('searchEntry', (entry) => {
                    output.push(entry.object)
                })
                response.on('end', () => {
                    resolve(output)
                })
            }
        })
    })
}

const createGroup = ((req, res) => {
    try {
        req.setEncoding('utf-8')

        const group = req.body

        client = connexion()
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
        })
        .then(client.unbind())
        .then(res.sendStatus(200))
    } catch (err) {
        res.sendStatus(500)
    }
})

const modifyGroup = ((req, res) => {
    try {
        req.setEncoding('utf-8')

        const group = req.body

        client = connexion()
        new Promise((resolve, reject) => {
            client.bind('cn='+process.env.LDAP_CN+',dc=boquette,dc=fr', process.env.LDAP_PASSWORD, () => {})

            for (let key in group) {
                const modif = Object.fromEntries(new Map().set(key, group[key]))
                const change = new ldap.Change({
                    operation: 'replace',
                    modification: modif
                })
                client.modify('cn='+group.cn+',ou=groups,dc=boquette,dc=fr', change, () => {})
            }
        })
        .then(client.unbind())
        .then(res.sendStatus(200))
    } catch (err) {
        res.sendStatus(500)
    }
})

const updateGroups = ((req, res) => {
    try {
        client = connexion()
        
        Promise.all([
            searchLDAP(client, '(!(cn=members))', 'ou=groups, dc=boquette, dc=fr'),
            searchLDAP(client, 'uid=*', 'ou=people, dc=boquette, dc=fr')
        ])
        .then(data => {
            const groups = data[0]
            const users = data[1]
        
            client.bind('cn='+process.env.LDAP_CN+',dc=boquette,dc=fr', process.env.LDAP_PASSWORD, () => {})

            for (let i = 0; i < groups.length; i++) {
                const change = new ldap.Change({
                    operation: 'delete',
                    modification: {
                        memberUid: ''
                    }
                })

                client.modify('cn='+groups[i].cn+',ou=groups,dc=boquette,dc=fr', change, () => {})

                var group = []

                for (let j = 0; j < users.length; j++) {
                    if (users[j].isInGrps !== '') {
                        var user = users[j]
                        var userGroups = user.isInGrps.trim().split(';')
                        
                        if (userGroups.includes(groups[i].cn)) {
                            group.push(user.uid)
                        }   
                    }
                }

                if (group.length !== 0) {
                    const change = new ldap.Change({
                        operation: 'add',
                        modification: {
                            memberUid: group
                        }
                    })

                    client.modify('cn='+groups[i].cn+',ou=groups,dc=boquette,dc=fr', change, () => {})
                }
            }
        })
        .then(client.unbind())
        .then(res.sendStatus(200))
    } catch (err) {
        res.sendStatus(500)
    }
})

const deleteGroup = ((req, res) => {
    try {
        req.setEncoding('utf8')

        const group = req.body.dn

        client = connexion()
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

