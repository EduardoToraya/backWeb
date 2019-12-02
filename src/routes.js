const express = require('express')
const router = express.Router()

const users = require('./controllers/users.js')
const artists = require('./controllers/artists.js')
const auth = require('./middleware/auth')

router.get('/users', auth, users.getUser)
router.post('/login', users.login)
router.post('/logout', auth, users.logout)
router.post('/users', users.createUser)  // signup
router.patch('/users', auth, users.updateUser)
router.delete('/users', auth, users.deleteUser)

router.get('/artists/:id', auth, artists.getArtist)
router.get('/artists', auth, artists.getArtists)
router.post('/artists', auth, artists.createArtist)
//router.patch('/artists/:id', auth, artists.updateArtist)
router.delete('/artists/:id', auth, artists.deleteArtist)

router.get('*', function(req, res) {
  res.send({
    error: 'This route does not exist, try /users or /artists'
  })
})

module.exports = router
