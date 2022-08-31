const ldap = require('../ldap/ldap')
const ssha = require('ssha')
const { resolve } = require('path')

// chargement du fichier d'env
require('dotenv').config()

const getUser = ((req, res) => {
    try {
        const { headers } = req

        var client = ldap.connexion()

        client.bind('uid='+headers.uid+',ou=people,dc=boquette,dc=fr', headers.password, (err) => {
            if (err) {
                client.destroy()
                res.status(401).send('Invalid Credentials')
            } else {
                ldap.searchLDAP(client, '(uid='+headers.uid+')', 'ou=people,dc=boquette,dc=fr')
                .then(output => {
                    client.destroy()
                    res.send(output)
                })
            }
        })
    } catch (err) {
        res.sendStatus(500)
    } 
})

const createUser = ((req, res) => {
    try {
        req.setEncoding('utf8')

        const user = req.body
        var uid = user.givenName.toLowerCase().replace(/\s+/g, '')+'.'+user.sn.toLowerCase().replace(/\s+/g, '')+new Date().getFullYear()

        var client = ldap.connexion()
        ldap.searchUidLDAP(client)
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
                userPassword: ssha.create(user.password.replace(/\s+/g, ''))
            }

            client.add('uid='+uid+',ou=people,dc=boquette,dc=fr', entry, (err) => {client.destroy()})
            resolve()
        })
        .then(res.sendStatus(200))
    } catch (err) {
        res.sendStatus(500)
    }
})

const modifyUser = ((req, res) => {
    try {
        req.setEncoding('utf-8')

        const user = req.body.user

        var client = ldap.connexion()
        client.bind('uid='+req.body.uid+',ou=people,dc=boquette,dc=fr', req.body.password, (err) => {
            if (err) {
                client.destroy()
                res.sendStatus(401)
            } else {
                client.unbind()
                
                for (let key in user) {
                    if (user[key] !== '') {
                        if (key == 'userPassword') {
                            user.userPassword = ssha.create(user.userPassword)
                        }

                        const modif = Object.fromEntries(new Map().set(key, user[key]))
                        ldap.modifyLDAP('replace', modif, 'uid='+req.body.uid+',ou=people,dc=boquette,dc=fr')
                    }
                }
                res.sendStatus(200)
            }
        })
    } catch (err) {
        res.sendStatus(500)
    }
})

module.exports = {
    getUser,
    createUser,
    modifyUser
}