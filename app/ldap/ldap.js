var ldap = require('ldapjs')

require('dotenv').config()

const connexion = (() => {
    const client = ldap.createClient({
        url: process.env.LDAP_IP
    })
    client.on('error', (err) => {
        console.log("Connexion error : " + err)
    })
    return client
})

const searchLDAP = function(client, filter, dn) {
    return new Promise((resolve, reject) => {
        var opts = {
            filter: filter,
            scope: 'sub'
        }
        client.bind('cn='+process.env.LDAP_CN+',dc=boquette,dc=fr', process.env.LDAP_PASSWORD, () => {})

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

const addLDAP = ((entry) => {
    var client = connexion()
    client.bind('cn='+process.env.LDAP_CN+',dc=boquette,dc=fr', process.env.LDAP_PASSWORD, () => {})
    client.add('uid='+entry.uid+',ou=people,dc=boquette,dc=fr', entry, (err) => {client.destroy()})
})

const modifyLDAP = ((action, modif, dn) => {
    var client = connexion()
    client.bind('cn='+process.env.LDAP_CN+',dc=boquette,dc=fr', process.env.LDAP_PASSWORD, () => {})

    const change = new ldap.Change({
        operation: action,
        modification: modif
    })
    client.modify(dn, change, (err) => {client.destroy()})
})

const delLDAP = ((user) => {
    var client = connexion()
    client.bind('cn='+process.env.LDAP_CN+',dc=boquette,dc=fr', process.env.LDAP_PASSWORD, () => {})
    client.del(user, () => {client.destroy()})
})

module.exports = {
    connexion,
    searchLDAP,
    searchUidLDAP,
    addLDAP,
    modifyLDAP,
    delLDAP
}