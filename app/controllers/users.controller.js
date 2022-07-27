var ldap = require('ldapjs')

const ssha = require('ssha')

const connexion = (() => {
    const client = ldap.createClient({
        url: process.env.LDAP_IP
    })
    client.on('error', (err) => {
        console.log("Connexion error : " + err)
    })
    return client
})

//Récupérer les informations sur un utilisateur

const getUser = ((req, res) => {
    try {
        client = connexion()
        searchLDAP(client, 'uid='+req.params.userId, 'ou=people, dc=boquette, dc=fr')
        .then(output => res.send(output))
    } catch (err) {
        res.sendStatus(500)
    }
})

const getAllUsers = ((req, res) => {
    try {
        client = connexion()
        searchLDAP(client, 'uid=*', 'ou=people, dc=boquette, dc=fr')
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

const searchUidLDAP = ((client) => {
    return new Promise((resolve, reject) => {
        var opts = {
            filter: 'uid=*',
            scope: 'sub'
        }
        client.search('ou=people, dc=boquette, dc=fr', opts, (err, response) => {
            if (!err) {
                var output = []
                response.on('searchEntry', (entry) => {
                    output.push(entry.object.uidNumber)
                })
                response.on('end', () => {
                    resolve(parseInt(output.sort().pop())+1)
                })
            }
        })
    })
})

const createUser = ((req, res) => {
    try {
        req.setEncoding('utf8')

        const user = req.body

        client = connexion()
        searchUidLDAP(client)
        .then(uidNumber => {
            client.bind('cn='+process.env.LDAP_CN+',dc=boquette,dc=fr', process.env.LDAP_PASSWORD, () => {})

            const entry = {
                objectClass: ['inetOrgPerson', 'posixAccount', 'boquetteUser'],
                cn: user.uid,
                homeDirectory: '/home/'+user.uid,
                loginShell: '/bin/bash',
                uid: user.uid,
                uidNumber: uidNumber.toString(),
                gidNumber: '10001',
                sn: user.sn,
                givenName: user.givenName,
                mail: user.mail,
                mobile: user.mobile,
                displayName: user.displayName,
                description: user.description,
                userPassword: ssha.create('boquette'),
                nextcloudSpace: user.nextcloudSpace,
                isInGrps: user.isInGrps,
                nextcloudSpace: '10GB',
                bouls: user.bouls,
                gadzflix: user.gadzflix
            }
            client.add('uid='+entry.uid+',ou=people,dc=boquette,dc=fr', entry, () => {})
        })
        .then(client.unbind())
        .then(res.sendStatus(200)) 
    } catch (err) {
        res.sendStatus(500)
    }
})

const createUsers = ((req, res) => {
    try {
        req.setEncoding('utf8')

        const users = req.body

        client = connexion()
        searchUidLDAP(client)
        .then(uidNumber => {
            client.bind('cn='+process.env.LDAP_CN+',dc=boquette,dc=fr', process.env.LDAP_PASSWORD, () => {})

            for (let i = 0; i < users.length; i++) {
                if(users[i] !== '') {
                    var user = users[i].split(';')

                    const entry = {
                        objectClass: ['inetOrgPerson', 'posixAccount', 'boquetteUser'],
                        cn: user[0],
                        homeDirectory: '/home/'+user[0],
                        loginShell: '/bin/bash',
                        uid: user[0],
                        uidNumber: (uidNumber+i).toString(),
                        gidNumber: '10001',
                        sn: user[3],
                        givenName: user[4],
                        mail: user[5],
                        mobile: user[6],
                        displayName: user[2],
                        description: user[1],
                        userPassword: ssha.create('boquette'),
                        isInGrps: user[8],
                        nextcloudSpace: '10GB',
                        bouls: user[7],
                        gadzflix: user[9]
                    }

                    client.add('uid='+entry.uid+',ou=people,dc=boquette,dc=fr', entry, () => {})
                }

                // if (users[i].split(';')[8]) {
                //     var groups = users[i].split(';')[8].split(',')
                //     var uid = users[i].split(';')[0]

                //     for (let j = 0; j < groups.length; j++) {
                //         const change = new ldap.Change({
                //             operation: 'add',
                //             modification: {
                //                 memberUid: uid
                //             }
                //         })

                //         client.modify('cn='+groups[j]+',ou=groups,dc=boquette,dc=fr', change, (err) => {})
                //     }
                // }
            }
        })
        .then(client.unbind())
        .then(res.sendStatus(200))
    } catch (err) {
        res.sendStatus(500)
    }
})

const modifyUser = ((req, res) => {
    try {
        req.setEncoding('utf-8')

        const user = req.body
        
        client = connexion()
        new Promise((resolve, reject) => {
            client.bind('cn='+process.env.LDAP_CN+',dc=boquette,dc=fr', process.env.LDAP_PASSWORD, () => {})

            for (let key in user) {
                const modif = Object.fromEntries(new Map().set(key, user[key]))
                const change = new ldap.Change({
                    operation: 'replace',
                    modification: modif
                })
                client.modify('uid='+user.uid+',ou=people,dc=boquette,dc=fr', change, () => {})
            }
        })
        .then(client.unbind())
        .then(res.sendStatus(200))
    } catch (err) {
        res.sendStatus(500)
    }
})

const modifyUsers = ((req, res) => {
    try {
        req.setEncoding('utf-8')

        const users = req.body.users
        const headers = req.body.headers.split(';')

        client = connexion()
        new Promise((resolve, reject) => {
            client.bind('cn=admin,dc=boquette,dc=fr', 'boquette1815', () => {})

            for (let i = 0; i < users.length; i++) {
                if (users[i] !== '') {
                    var user = users[i].split(';')
                    
                    for (let j = 0; j < user.length; j++) {
                        const modif = Object.fromEntries(new Map().set(headers[j], user[j]))
                        const change = new ldap.Change({
                            operation: 'replace',
                            modification: modif
                        })
                        client.modify('uid='+user[0]+',ou=people,dc=boquette,dc=fr', change, () => {})
                    }
                }
            }
        })
        .then(client.unbind())
        .then(res.sendStatus(200))
    } catch (err) {
        res.sendStatus(500)
    }
})

const deleteUser = ((req, res) => {
    try {
        req.setEncoding('utf8')

        const user = req.body.dn

        client = connexion()
        client.bind('cn=admin,dc=boquette,dc=fr', 'boquette1815', () => {})
        client.del(user, () => {})
        client.unbind()

        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(500)
    }
})

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    createUsers,
    modifyUser,
    modifyUsers,
    deleteUser
}