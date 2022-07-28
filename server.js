const express = require('express')
const app = express()
const cors = require('cors')

const jwt = require('jsonwebtoken')

const path = require('path')

var ldap = require('ldapjs')

const authRoute = require('./app/routes/auth.route.js')
const userRoute = require('./app/routes/user.route.js')
const usersRoute = require('./app/routes/users.route.js')
const groupsRoute = require('./app/routes/groups.route.js')

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

    const client = ldap.createClient({
      url: process.env.LDAP_IP
    })
    client.on('error', (err) => {
      console.log("Connexion error : " + err);
    })

    var opts = {
      filter: '(cn='+username+')',
      scope: 'sub'
    }
    client.search('dc=boquette, dc=fr', opts, (err, response) => {
      if (err == undefined) {
        response.on('searchEntry', (entry) => {
          if (entry.object == undefined) {
            return res.status(401).send("Invalid Credentials")
          }
          req.user = username
        })
      }
    })
        
    return next()
  } catch (err) {
    return res.status(500).send("Internal Authentification Server Error")
  }
})

app.use(cors({
  methods: ['GET','POST','PUT', 'PATCH', 'DELETE'],
  origin: process.env.ALLOW_ORIGIN,
  credentials: true
}))
app.use(express.json())
app.use(express.static(path.join(__dirname, process.env.FRONT_URL)))

const routes = ['users', 'groups', 'modify', 'new']
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, process.env.FRONT_URL+'/index.html')) // Route principale, page d'accueil
})
routes.map(item => 
  app.get('/'+item, (req, res) => {
    res.sendFile(path.join(__dirname, process.env.FRONT_URL+'/'+item+'.html')) // Différentes routes de l'application, permet le refresh de la page
  })
)

app.use('/api/auth', authRoute) // Routes sans besoin d'identification préalable
app.use('/api/user', userRoute)
app.use('/api/users', auth, usersRoute) // Routes avec le middleware d'authentification
app.use('/api/groups', auth, groupsRoute)

app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname, process.env.FRONT_URL+'/404.html')) // Route 404 si cela ne mène a rien
)

app.set('port', 4040)
console.log('Server listening on port', app.get('port'))
app.listen(app.get('port'))