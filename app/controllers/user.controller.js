// chargement du fichier d'env
require('dotenv').config()

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
        var uid = user.givenName.toLowerCase()+'.'+user.sn.toLowerCase()+'.'+new Date().getFullYear()

        client = connexion()
        searchUidLDAP(client)
        .then(uidNumber => {
            client.bind('cn='+process.env.LDAP_CN+',dc=boquette,dc=fr', process.env.LDAP_PASSWORD, () => {})
            
            const entry = {
                objectClass: ['inetOrgPerson', 'posixAccount', 'boquetteUser'],
                cn: uid,
                homeDirectory: '/home/'+uid,
                loginShell: '/bin/bash',
                uid: uid,
                uidNumber: uidNumber.toString(),
                gidNumber: '10001',
                sn: user.sn.toUpperCase(),
                givenName: user.givenName,
                mail: user.mail,
                mobile: user.mobile,
                userPassword: ssha.create(user.password),
                nextcloudSpace: '10GB',
                gadzflix: 'FALSE'
            }

            client.add('uid='+uid+',ou=people,dc=boquette,dc=fr', entry, () => {})
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

        const user = req.body.user

        client = connexion()
        client.bind('uid='+req.body.uid+',ou=people,dc=boquette,dc=fr', req.body.password, (err) => {
            if (err) {
                res.sendStatus(401)
            } else {
                client.unbind()
                new Promise((resolve, reject) => {
                    client = connexion()
                    client.bind('cn='+process.env.LDAP_CN+',dc=boquette,dc=fr', process.env.LDAP_PASSWORD, () => {})

                    for (let key in user) {
                        if (user[key] !== '') {
                            if (key == 'userPassword') {
                                user.userPassword = ssha.create(user.userPassword)
                            }
                            const modif = Object.fromEntries(new Map().set(key, user[key]))
                            const change = new ldap.Change({
                                operation: 'replace',
                                modification: modif
                            })
                            client.modify('uid='+req.body.uid+',ou=people,dc=boquette,dc=fr', change, () => {})
                        }
                    }
                })
                .then(client.unbind())
                .then(res.sendStatus(200))
            }
        })
    } catch (err) {
        res.sendStatus(500)
    }
})

module.exports = {
    createUser,
    modifyUser
}