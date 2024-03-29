const Sequelize = require('sequelize')
const sequelize = require('../db')
const Playlists = require('../playlists/tableDef')

const Song = sequelize.define('songs', {
  title: {
    type: Sequelize.STRING,
    field: 'name',
    allowNull: false
  },
  artist: {
    type: Sequelize.STRING,
    field: 'artist',
    allowNull: false
  },
  album: {
    type: Sequelize.STRING,
    field: 'album',
    allowNull: false
  }
}, {
    timestamps: false,
    tableName: 'songs'
  })

Song.belongsTo(Playlists)

module.exports = Song