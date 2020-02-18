const userRouter = require('../routers/users');
const petRouter = require('../routers/pets');
const fileRouter = require('../routers/file');
const albumRouter = require('../routers/album');
const notificationRouter = require('../routers/notifications');
const photoRouter = require('../routers/photos');

module.exports = {
    userRouter,
    petRouter,
    fileRouter,
    albumRouter,
    notificationRouter,
    photoRouter
}