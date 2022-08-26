const jwt = require('jsonwebtoken')
const ldap = require('../ldap/ldap')
require('dotenv').config()

const auth = ((req, res, next) => {
    try {
        const { headers } = req
        
        if (!headers.cookie) {
            return res.status(401).send("Unable to find Cookies")
        }
    
        const accessToken = headers.cookie.replace('access_token=', '')
    
        if (!headers || !headers['x-xsrf-token']) {
            return res.status(401).send("Unable to find Tokens")
        }
        
        const xsrfToken = headers['x-xsrf-token']
    
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    
        if (xsrfToken !== decodedToken.xsrfToken) {
            return res.status(401).send("Invalid Credentials")
        }
    
        const username = decodedToken.data

        client = ldap.connexion()
        var opts = {
            filter: '(cn='+username+')',
            scope: 'sub'
        }
        client.search('dc=boquette, dc=fr', opts, (err, response) => {
            if (err == undefined) {
                response.on('searchEntry', (entry) => {
                    if (entry.object == undefined) {
                        return res.status(401).send("Invalid Credentials")
                    } else {
                        client.bind('cn='+username+',dc=boquette, dc=fr', process.env.LDAP_PASSWORD, (err) => {
                            if (err) {
                                client.unbind()
                                return res.status(401).send("Invalid Credentials")
                            } else {
                                client.unbind()
                                return next()
                            }
                        })
                    }
                })
            }
        })
        client.unbind()
    } catch (err) {
        return res.status(500).send("Internal Authentification Server Error")
    }
})

module.exports = auth