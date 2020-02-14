const express = require('express');
const router = new express.Router();
const AlbumController = require('../controllers/album_controller');
const album_controller = new AlbumController();
const auth = require('../middleware/auth');

router.get('/albums', auth, album_controller.getAlbums);          
router.put('/album/:id', auth, album_controller.uppdateAlbum);
router.post('/album/add', auth, album_controller.addAlbum);
router.get('/album/:userId', auth, album_controller.getAlbumsByUserId);  
router.delete('/album/:albumId', auth, album_controller.deleteAlbum);

module.exports = router;

