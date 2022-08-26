const ssha = require('ssha')
const ldap = require('../ldap/ldap')
var nodemailer = require('nodemailer')

require('dotenv').config()

//Récupérer les informations sur un utilisateur
const getUser = ((req, res) => {
    try {
        client = ldap.connexion()
        ldap.searchLDAP(client, 'uid='+req.params.userId, 'ou=people, dc=boquette, dc=fr')
        .then(output => {
            res.send(output)
            client.unbind()
        })
    } catch (err) {
        res.sendStatus(500)
    }
})

const getAllUsers = ((req, res) => {
    try {
        client = ldap.connexion()
        ldap.searchLDAP(client, 'uid=*', 'ou=people, dc=boquette, dc=fr')
        .then(output => {
            res.send(output)
            client.unbind()
        })
    } catch (err) {
        res.sendStatus(500)
    }
})

const createUser = ((req, res) => {
    try {
        req.setEncoding('utf8')

        const user = req.body

        client = ldap.connexion()
        ldap.searchUidLDAP(client)
        .then(uidNumber => {
            client.bind('cn='+process.env.LDAP_CN+',dc=boquette,dc=fr', process.env.LDAP_PASSWORD, (err) => {console.log(err)})

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
                bouls: user.bouls
            }
            client.add('uid='+entry.uid+',ou=people,dc=boquette,dc=fr', entry, (err) => {console.log(err)})
        })
        .then(() => {
            client.unbind()
            envoiMail(user.mail)
        })
        .then(res.sendStatus(200)) 
    } catch (err) {
        res.sendStatus(500)
    }
})

const createUsers = ((req, res) => {
    try {
        req.setEncoding('utf8')

        const users = req.body

        client = ldap.connexion()
        ldap.searchUidLDAP(client)
        .then(uidNumber => {
            client.bind('cn='+process.env.LDAP_CN+',dc=boquette,dc=fr', process.env.LDAP_PASSWORD, (err) => {console.log(err)})

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
                        bouls: user[7]
                    }

                    client.add('uid='+entry.uid+',ou=people,dc=boquette,dc=fr', entry, (err) => {console.log(err)})
                }
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

        client = ldap.connexion()
        new Promise((resolve, reject) => {
            client.bind('cn='+process.env.LDAP_CN+',dc=boquette,dc=fr', process.env.LDAP_PASSWORD, (err) => {console.log(err)})

            for (let key in user) {
                if (key != 'dn') {
                    const modif = Object.fromEntries(new Map().set(key, user[key]))
                    ldap.modifyLDAP(client, modif, user.dn)
                }
            }
            client.unbind()
        })
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

        client = ldap.connexion()
        new Promise((resolve, reject) => {
            client.bind('cn='+process.env.LDAP_CN+',dc=boquette,dc=fr', process.env.LDAP_PASSWORD, (err) => {console.log(err)})

            for (let i = 0; i < users.length; i++) {
                if (users[i] !== '') {
                    var user = users[i].split(';')

                    for (let j = 0; j < user.length; j++) {
                        const modif = Object.fromEntries(new Map().set(headers[j], user[j]))
                        ldap.modifyLDAP(client, modif, 'uid='+user[0]+',ou=people,dc=boquette,dc=fr')
                    }
                }
            }
            client.unbind()
        })
        .then(res.sendStatus(200))
    } catch (err) {
        res.sendStatus(500)
    }
})

const deleteUser = ((req, res) => {
    try {
        req.setEncoding('utf8')

        const user = req.body.dn

        client = ldap.connexion()
        client.bind('cn='+process.env.LDAP_CN+',dc=boquette,dc=fr', process.env.LDAP_PASSWORD, (err) => {console.log(err)})
        client.del(user, (err) => {console.log(err)})
        client.unbind()

        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(500)
    }
})

const envoiMail = ((dest) => {
    let mailTransporter = nodemailer.createTransport({
        host: 'ssl0.ovh.net',
        auth: {
            user: process.env.MAIL_ADDRESS,
            pass: process.env.MAIL_MDP
        }
    })

    let mailDetails = {
        from: 'Equipe support - Boquette <support@boquette.fr>',
        to: dest,
        subject: 'Information - Votre nouveau compte Boquette',
        text: 'Bonjour, Nous vous informons que votre compte boquette a bien été créé'
    }

    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log('Error Occurs', err)
        } else {
            console.log('Email sent successfully')
        }
    })
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