const ssha = require('ssha')
const ldap = require('../ldap/ldap')
var nodemailer = require('nodemailer')

require('events').EventEmitter.prototype._maxListeners = 250;

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
        ldap.searchLDAP(client, '(uid=*)', 'ou=people, dc=boquette, dc=fr')
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
            var pass = Math.random().toString(36).slice(-8)

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
                userPassword: ssha.create(pass)
            }
            client.bind('cn='+process.env.LDAP_CN+',dc=boquette,dc=fr', process.env.LDAP_PASSWORD, () => {})
            client.add('uid='+entry.uid+',ou=people,dc=boquette,dc=fr', entry, () => {client.destroy()})
            envoiMail(user.mail, 'Création de votre compte Boquette',
                'Bonjour '+user.uid+',\n\n'+
                'Votre compte Boquette a été créé, cependant il vous faut changer votre mot de passe\n\n'+
                'Rendez-vous sur https://utilisateur.boquette.fr/reset?uid='+entry.uid+'&password='+pass+' pour cela\n'+
                'Puis saisissez votre nouveau mot de passe\n\n'+
                'Si le lien ne fonctionne pas, rendez-vous sur https://utilisateur.boquette.fr/reset \n'+
                'Votre nom d\'utilisateur : '+user.uid+
                'Votre mot de passe de vérification : '+pass+'\n\n'+
                'Excellente journée,\n'+
                'L\'équipe Boquette Infal'
            )
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
                    var user = users[i].split(',')
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
                        userPassword: ssha.create(pass)
                    }
                    ldap.addLDAP(entry)
                    // envoiMail(user[5], 'Création de votre compte Boquette',
                    //     'Bonjour '+user[0]+',\n\n'+
                    //     'Votre compte Boquette a été créé, cependant il vous faut changer votre mot de passe\n\n'+
                    //     'Rendez-vous sur https://utilisateur.boquette.fr/reset?uid='+user[0]+'&password='+pass+' pour cela\n'+
                    //     'Puis saisissez votre nouveau mot de passe\n\n'+
                    //     'Si le lien ne fonctionne pas, rendez-vous sur https://utilisateur.boquette.fr/reset \n'+
                    //     'Votre nom d\'utilisateur : '+user[0]+
                    //     'Votre mot de passe de vérification : '+pass+'\n\n'+
                    //     'Excellente journée,\n'+
                    //     'L\'équipe Boquette Infal'
                    // )
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
                ldap.modifyLDAP('replace', modif, user.dn)
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
                    ldap.modifyLDAP('replace', modif, 'uid='+user[0]+',ou=people,dc=boquette,dc=fr')
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

        ldap.modifyLDAP('replace', modif, user.dn)
        
        envoiMail(user.mail, 'Réinitialisation de votre Mot de Passe Boquette',
            'Bonjour '+user.uid+',\n\n'+
            'Le Mot de Passe de votre compte Boquette a été réinitialisé\n\n'+
            'Rendez-vous sur https://utilisateur.boquette.fr/reset?uid='+user.uid+'&password='+pass+'\n'+
            'Afin de saisir votre nouveau mot de passe\n\n'+
            'Si le lien ne fonctionne pas, rendez-vous sur https://utilisateur.boquette.fr/reset \n'+
            'Votre nom d\'utilisateur : '+user.uid+'\n'+
            'Votre mot de passe de vérification : '+pass+'\n\n'+
            'Excellente journée,\n'+
            'L\'équipe Boquette Infal'
        )        
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
            var user = users[i].split(',')
            var pass = Math.random().toString(36).slice(-8)

            if (user[0] != '' && user[1] != '') {
                var modif = Object.fromEntries(new Map().set('userPassword', ssha.create(pass)))

                ldap.modifyLDAP('replace', modif, 'uid='+user[0]+',ou=people,dc=boquette,dc=fr')
                
                envoiMail(user[1], 'Réinitialisation de votre Mot de Passe Boquette',
                    'Bonjour '+user.uid+',\n\n'+
                    'Le Mot de Passe de votre compte Boquette a été réinitialisé\n\n'+
                    'Rendez-vous sur https://utilisateur.boquette.fr/reset?uid='+user[0]+'&password='+pass+'\n'+
                    'Afin de saisir votre nouveau mot de passe\n\n'+
                    'Si le lien ne fonctionne pas, rendez-vous sur https://utilisateur.boquette.fr/reset \n'+
                    'Votre nom d\'utilisateur : '+user[0]+'\n'+
                    'Votre mot de passe de vérification : '+pass+'\n\n'+
                    'Excellente journée,\n'+
                    'L\'équipe Boquette Infal'
                )
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

        ldap.delLDAP(req.body.dn)

        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(500)
    }
})

const envoiMail = ((dest, subject, text) => {
    let mailTransporter = nodemailer.createTransport({
        host: 'ssl0.ovh.net',
        secure: true,
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