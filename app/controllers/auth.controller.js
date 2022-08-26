const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const ldap = require('../ldap/ldap')

// chargement du fichier d'env
require('dotenv').config()

function generateAccessToken(user, xsrfToken) {
  return jwt.sign(
    {data: user, xsrfToken},
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '10m'
    }
  )
}

const setToken = ((req, res) => {
  try {
    req.setEncoding('utf8')

    client = ldap.connexion()
    client.bind('cn=' + req.body.username + ', dc=boquette, dc=fr', req.body.password, (err) => {
      if (err == undefined) {
        const xsrfToken = crypto.randomBytes(64).toString('hex')
        const accessToken = generateAccessToken(req.body.username, xsrfToken)

        client.unbind()

        res.cookie('access_token', accessToken, {
          httpOnly: true,
          secure: false,
          maxAge: 10*60*1000
        })
        res.send({
          xsrfToken
        })
      } else {
        client.unbind()
        res.status(401).send("Invalid Credentials")
      }
    })
  } catch (err) {
    res.sendStatus(500)
  }
})

module.exports = {
  setToken
}