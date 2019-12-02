const mongoose = require('mongoose')
const validator = require('validator')

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
})

const Artist = mongoose.model('Artist', artistSchema)

module.exports = Artist
