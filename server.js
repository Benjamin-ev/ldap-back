const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')

require('dotenv').config()

const authRoute = require('./app/routes/auth.route.js')
const userRoute = require('./app/routes/user.route.js')
const usersRoute = require('./app/routes/users.route.js')
const groupsRoute = require('./app/routes/groups.route.js')
const auth = require('./app/middleware/auth.middleware')

app.use(cors({
  methods: ['GET','POST','PUT', 'PATCH', 'DELETE'],
  origin: process.env.ALLOW_ORIGIN,
  credentials: true
}))
app.use(express.json())
app.use(express.static(path.join(__dirname, process.env.FRONT_URL)))

const routes = ['users', 'groups', 'modify', 'new', 'profile']
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