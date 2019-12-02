const Artist = require('../models/artist')

const getArtists = function(req, res) {
  // solo podemos hacer GET de los artists del usuario que hizo login
  Artist.find({ createdBy: req.user._id}).then(function(artists) {
    res.send(artists)
  }).catch(function(error){
    res.status(500).send(error)
  })
}

const getArtist = function(req, res) {
  // solo podemos traer el artist si es que es del usuario que hizo login
  const _id = req.params.id
  Artist.findOne({ _id, createdBy: req.user._id }).then(function(artist) {
    if(!artist){
      return res.status(404).send({ error: `Task with id ${_id} not found.`})
    }
    return res.send(artist)
  }).catch(function(error) {
    return res.status(500).send({ error: error })
  })
}

const createArtist = function(req, res){
  // los ... son para copiar artist el req.body
  // modificar aqui

  const artist = new Artist({
    name : req.body.name,
    createdBy: req.user._id
  })


  artist.save().then(function() {
    return res.send(artist)
  }).catch(function(error) {
    return res.status(400).send({ error: error })
  })
}
/*
const updateArtist = function(req, res) {
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed']
  // revisa que los updates enviados sean permitidos, que no envie una key que no permitimos
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

  if( !isValidUpdate ) {
    return res.status(400).send({
      error: 'Invalid update, only allowed to update: ' + allowedUpdates
    })
  }
  // ya no solo buscamos por id, si no también deberia de ser de el owner
  // del artist por lo tanto usamos findOneAndUpdate para pasarle mas datos
  // Artist.findByIdAndUpdate(_id, req.body ).then(function(artist) {
  Artist.findOneAndUpdate({ _id, createdBy: req.user._id }, req.body ).then(function(artist) {
    if (!artist) {
      return res.status(404).send({ error: `Task with id ${_id} not found.`})
    }
    return res.send(artist)
  }).catch(function(error) {
    res.status(500).send({ error: error })
  })
}*/

const deleteArtist = function(req, res) {
  const _id = req.params.id
  Artist.findOneAndDelete({ _id, createdBy: req.user._id }).then(function(artist){
    if(!artist) {
      return res.status(404).send({ error: `Task with id ${_id} not found.`})
    }
    return res.send(artist)
  }).catch(function(error) {
    res.status(505).send({ error: error })
  })
}

module.exports = {
  getArtists : getArtists,
  getArtist: getArtist,
  createArtist : createArtist,
  //updateArtist : updateArtist,
  deleteArtist : deleteArtist
}
