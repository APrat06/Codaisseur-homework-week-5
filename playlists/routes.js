const { Router } = require('express')
const Playlist = require('./tableDef')
const { isAuthenticated } = require('../auth/routes')

const routerPlaylists = new Router()

if (isAuthenticated) {
  routerPlaylists.get('/playlists', (req, res, next) => {

    Promise.all([
      Playlist.findAll()
    ])
      .then((playlists) => {
        res.send({
          playlists
        })
      })
      .catch(error => next(error))
  })

  routerPlaylists.get('/playlists/:id', (req, res, next) => {
    Playlist
      .findById(req.params.id)
      .then(playlist => {
        if (!playlist) {
          return res.status(404).send({
            message: `playlist does not exist`
          })
        }
        return res.send(playlist)
      })
      .catch(error => next(error))
  })

  routerPlaylists.post('/playlists', (req, res, next) => {
    Playlist
      .create(req.body)
      .then(playlist => {
        if (!playlist) {
          return res.status(404).send({
            message: `playlist does not exist`
          })
        }
        return res.status(201).send(playlist)
      })
      .catch(error => next(error))
  })

  routerPlaylists.delete('/playlists/:id', (req, res, next) => {
    Playlist
      .findById(req.params.id)
      .then(playlist => {
        if (!playlist) {
          return res.status(404).send({
            message: `playlist does not exist`
          })
        }
        return playlist.destroy()
          .then(() => res.send({
            message: `playlist was deleted`
          }))
      })
      .catch(error => next(error))
  })
} else {
  routerPlaylists.get('/playlists', () => {
    console.log("sorry, you are not allowed to access this")
  })
  routerPlaylists.get('/playlists/:', () => {
    console.log("sorry, you are not allowed to access this")
  })
}

module.exports = routerPlaylists