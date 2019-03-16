const { Router } = require('express')
const { toJWT } = require('./jwt')
const auth = require('./middleware')

const authRouter = new Router()

authRouter.post('/logins', (req, res, next) => {

  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    res.status(400).send({
      message: 'Please supply an email and password'
    })
  }
  else {
    res.send({
      jwt: toJWT({ userId: 1 })
    })
  }
})

authRouter.get('/tokens', auth, (req, res) => {
  res.send({
    message: "You are now authenticated.",
  })
  isAuthenticated = true
  module.exports = {isAuthenticated}
})

module.exports = authRouter