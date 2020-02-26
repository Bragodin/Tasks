const express = require('express');
const router = new express.Router();
const FriendsController = require('../controllers/friends_controller');
const friends_controller = new FriendsController();
const auth = require('../middleware/auth');

router.get('/:id', auth, friends_controller.getFriends);
router.get('/requests/:id', auth, friends_controller.getUsersWithFriendsRequest);
router.post('/addFriend', auth, friends_controller.addToFriends);
// router.get('/getFriendds', auth)

module.exports = router;

