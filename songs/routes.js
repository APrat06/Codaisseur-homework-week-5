const { Router } = require('express')
const Song = require('./tableDef')
const Playlist = require('../playlists/tableDef')

const routerSongs = new Router()

routerSongs.get('/playlists/:id/songs', (req, res, next) => {

  Promise.all([
    Song.findAndCountAll()
  ])
    .then(([total, songs]) => {
      res.send({
        songs, total
      })
    })
    .catch(error => next(error))
})

routerSongs.get('/playlists/:id/songs/:id', (req, res, next) => {
  Song
    .findById(req.params.id, { include: [Playlist] })
    .then(Song => {
      if (!Song) {
        return res.status(404).send({
          message: `Song does not exist`
        })
      }
      return res.send(Song)
    })
    .catch(error => next(error))
})

routerSongs.post('/playlists/:id/songs', (req, res, next) => {
  Song
    .create(req.body)
    .then(Song => {
      if (!Song) {
        return res.status(404).send({
          message: `Song does not exist`
        })
      }
      return res.status(201).send(Song)
    })
    .catch(error => next(error))
})

routerSongs.delete('/playlists/:id/songs/:id', (req, res, next) => {
  Song
    .findById(req.params.id, { include: [Playlist] })
    .then(Song => {
      if (!Song) {
        return res.status(404).send({
          message: `Song does not exist`
        })
      }
      return Song.destroy()
        .then(() => res.send({
          message: `Song was deleted`
        }))
    })
    .catch(error => next(error))
})

module.exports = routerSongs