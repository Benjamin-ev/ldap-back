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
            client.destroy()
            res.send(output)
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
            client.destroy()
            res.send(output)
        })
    } catch (err) {
        res.sendStatus(500)
    }
})

const createUser = ((req, res) => {
    try {
        req.setEncoding('utf8')

        const user = req.body

        var client = ldap.connexion()
        ldap.searchUidLDAP(client)
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
                activeBouls: user.activeBouls
            }
            client.add('uid='+entry.uid+',ou=people,dc=boquette,dc=fr', entry, () => {client.destroy()})  
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

        var client = ldap.connexion()
        ldap.searchUidLDAP(client)
        .then(uidNumber => {
            client.destroy()

            for (let i = 0; i < users.length; i++) {
                if(users[i] !== '') {
                    var user = users[i].split(';')
                    var pass = Math.random().toString(36).slice(-8)

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
                        userPassword: ssha.create(pass),
                        activeBouls: user[7]
                    }
                    ldap.addLDAP(entry)
                    envoiMail(user[5], 'Création de votre compte Boquette',
                        'Bonjour,\n\nVotre compte Boquette a été créé, cependant il vous faut changer votre mot de passe\n\nRendez-vous sur https://utilisateur.boquette.fr/modify pour cela\nVotre mot de passe de vérification : '+pass+'\n\nExcellente journée,\nL\'équipe Boquette Infal'
                    )
                }
            }
        })
        .then(res.sendStatus(200))
    } catch (err) {
        res.sendStatus(500)
    }
})

const modifyUser = ((req, res) => {
    try {
        req.setEncoding('utf-8')

        const user = req.body
        
        for (let key in user) {
            if (key != 'dn') {
                const modif = Object.fromEntries(new Map().set(key, user[key]))
                ldap.modifyLDAP(modif, user.dn)
            }
        }

        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(500)
    }
})

const modifyUsers = ((req, res) => {
    try {
        req.setEncoding('utf-8')

        const users = req.body.users
        const headers = req.body.headers.split(';')

        for (let i = 0; i < users.length; i++) {
            if (users[i] !== '') {
                var user = users[i].split(';')

                for (let j = 0; j < user.length; j++) {
                    const modif = Object.fromEntries(new Map().set(headers[j], user[j]))
                    ldap.modifyLDAP(modif, 'uid='+user[0]+',ou=people,dc=boquette,dc=fr')
                }
            }
        }

        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(500)
    }
})

const modifyPass = ((req, res) => {
    try {
        req.setEncoding('utf-8')

        const user = req.body

        const pass = Math.random().toString(36).slice(-8)

        const modif = Object.fromEntries(new Map().set('userPassword', ssha.create(pass)))

        ldap.modifyLDAP(modif, user.dn)
        
        envoiMail(user.mail,'Réinitialisation de votre Mot de Passe Boquette',
        'Bonjour,\n\nLe Mot de Passe de votre compte Boquette a été réinitialisé\n\nVeuillez vous rendre sur https://utilisateur.boquette.fr/modify afin de modifier votre mot de passe\n\nMot de passe de vérification : '+pass+'\n\nExcellente journée,\nL\'équipe Boquette Infal')
        
        res.sendStatus(200)
    } catch(err) {
        res.sendStatus(500)
    }
})

const modifyMultiplePass = ((req, res) => {
    try {
        req.setEncoding('utf-8')

        const users = req.body

        for (let i = 0; i < users.length; i++) {
            var user = users[i].split(';')
            var pass = Math.random().toString(36).slice(-8)

            if (user[0] != '' && user[1] != '') {
                var modif = Object.fromEntries(new Map().set('userPassword', ssha.create(pass)))

                ldap.modifyLDAP(modif, 'uid='+user[0]+',ou=people,dc=boquette,dc=fr')
                
                envoiMail(user[1],'Réinitialisation de votre Mot de Passe Boquette',
                'Bonjour,\n\nLe Mot de Passe de votre compte Boquette à été réinitialisé\n\nVeuillez vous rendre sur https://utilisateur.boquette.fr/modify afin de modifier votre mot de passe\n\nMot de passe de vérification : '+pass+'\n\nExcellente journée,\nL\'équipe Boquette Infal')
            }
        }
        
        res.sendStatus(200)
    } catch(err) {
        res.sendStatus(500)
    }
})

const deleteUser = ((req, res) => {
    try {
        req.setEncoding('utf8')

        const user = req.body.dn

        ldap.delLDAP(user)

        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(500)
    }
})

const envoiMail = ((dest, subject, text) => {
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
        subject: subject,
        text: text
    }

    mailTransporter.sendMail(mailDetails, function(err, data) {
        if (err) {
            console.log('Error Mail : ', err)
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
    modifyPass,
    modifyMultiplePass,
    deleteUser
}