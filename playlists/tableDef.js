const Sequelize = require('sequelize')
const sequelize = require('../db')
const Users = require('../users/tableDef')

const Playlist = sequelize.define('playlists', {
  name: {
    type: Sequelize.STRING,
    field: 'name',
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'playlists'
})

Playlist.belongsTo(Users)

module.exports = Playlist