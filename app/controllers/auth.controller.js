const jwt = require('jsonwebtoken')
const crypto = require('crypto')

// chargement du fichier d'env
require('dotenv').config()

var ldap = require('ldapjs');

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
  req.setEncoding('utf8')

  const client = ldap.createClient({
    url: 'ldap://'+process.env.LDAP_IP
  })
  client.on('error', (err) => {
    console.log("Connexion error : " + err);
  })

  client.bind('cn=' + req.body.username + ', dc=boquette, dc=fr', req.body.password, (err) => {
    if (err == undefined) {
      const xsrfToken = crypto.randomBytes(64).toString('hex')
      const accessToken = generateAccessToken(req.body.username, xsrfToken)

      res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: false,
        maxAge: 10*60*1000
      })
      res.send({
        xsrfToken
      })
    } else {
      res.status(401).send("Invalid Credentials")
    }
    client.unbind()
  })
})

module.exports = {
  setToken
}