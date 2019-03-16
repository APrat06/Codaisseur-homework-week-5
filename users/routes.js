const { Router } = require('express')
const User = require('./tableDef')
const bcrypt = require('bcrypt')

const usersRouter = new Router()

usersRouter.get('/', ()=>{
  console.log("Welcome to my api")
})

usersRouter.post('/users', (req, res, next) => {
  const user = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  }
  User
    .create(user)
    .then(users => {
      if (!users) {
        return res.status(404).send({
          message: `User does not exist`
        })
      }
      return res.status(201).send(user)
    })
    .catch(error => next(error))
})

usersRouter.get('/users', (req, res, next) => {
  User
    .findOne({
      where: {
        email: req.body.email
      }
    })
    .then(entity => {
      if (!entity) {
        res.status(400).send({
          message: 'User with that email does not exist'
        })
      }
      if (bcrypt.compareSync(req.body.password, entity.password)) {
        res.send({
          jwt: toJWT({ userId: entity.id })
        })
      }
      else {
        res.status(400).send({
          message: 'Password was incorrect'
        })
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).send({
        message: 'Something went wrong'
      })
    })
})

module.exports = usersRouter