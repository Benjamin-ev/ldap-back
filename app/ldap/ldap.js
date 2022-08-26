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
        client.search(dn, opts, (err, response) => {
            if (!err) {
                var output = []
                response.on('searchEntry', (entry) => {
                    output.push(entry.object)
                })
                response.on('end', () => {
                    client.destroy()
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
                    client.detroy()
                    resolve(parseInt(output.sort().pop())+1)
                })
            }
        })
    })
})

const modifyLDAP = ((client, modif, dn) => {
    const change = new ldap.Change({
        operation: 'replace',
        modification: modif
    })
    client.modify(dn, change, (err) => {console.log(err)})
})

module.exports = {
    connexion,
    searchLDAP,
    searchUidLDAP,
    modifyLDAP
}