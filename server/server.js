const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const rootRouter = require('./routers/index')
const session = require('express-session')
const PORT = process.env.PORT || 8000
const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy


const app = express()

const githubId = "d54ff0a0e73f7329a4df"
const githubSecret = "4712c5208dd4fa97c468bc49b957836c1694af9a"

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: githubId,
    clientSecret: githubSecret,
    callbackURL: "http://127.0.0.1:8000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
))


app.use(logger('dev'))
app.use(bodyParser.json())
app.use(cors())
app.use(session({
  secret: 'notejs2016',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', express.static(path.join(__dirname, '../public')))

app.use('/api', rootRouter)

app.get('/auth/github/callback',
passport.authenticate('github', { failureRedirect: '/signin' }),
function(req, res) {
  res.redirect('/folders');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})



app.listen(PORT, () => console.log('Server running on port', PORT))
