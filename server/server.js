const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const rootRouter = require('./routers/index')
const session = require('express-session')
const passport = require('passport')
const User = require('./db/db').Users
const Strategy = require('passport-facebook').Strategy
const PORT = process.env.PORT || 8000

passport.use(new Strategy({
    clientID: '1161007270614117',
    clientSecret: 'f3c61e55855a23372822ab1007454d0c',
    callbackURL: 'http://localhost:8000/login/facebook/return'
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log('hi im in the new strategy', profile)
      User.create({
        email: profile.displayName,
        password: profile.id
      })

      return cb(null, profile)
    }
))

passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((obj, cb) => {
  cb(null, obj)
})

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(session({
  secret: 'notejs2016',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(passport.initialize())
app.use(passport.session())
app.get('/login/facebook',
  passport.authenticate('facebook'
))

app.get('/login/facebook/return', passport.authenticate('facebook'), (req, res) => {
  res.redirect('/folders')
})
// app.get('/folders',function(req,res){
//  res.send('i am in folderse backend');
// })
app.use('/', express.static(path.join(__dirname, '../public')))

app.use('/api', rootRouter)

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.listen(PORT, () => console.log('Server running on port', PORT))
