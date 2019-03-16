const express = require('express')
const bodyParser = require('body-parser')
const songsRouter = require('./songs/routes')
const playlistsRouter = require('./playlists/routes')
const authRouter = require('./auth/routes')
const userRouter = require('./users/routes')

const app = express()
const port = process.env.PORT || 4000

app
  .use(bodyParser.json())
  .use(songsRouter, playlistsRouter, authRouter, userRouter)
  .listen(port, () => console.log(`Listening on port ${port}`))

