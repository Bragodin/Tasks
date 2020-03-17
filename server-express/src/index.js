const express = require('express');
const app = express();
const router = require('./routers/export-router');
const mongoose = require('mongoose');
const cors = require('cors');
///
const MessageService = require('./services/message_service');
const message_service = new MessageService();
const NotificationsService = require('./services/notifications_service');
const notificationsService = new NotificationsService();
//sockets
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.sockets.on('connection', function (socket) {
  const socketId = (socket.id).toString().substr(0, 5); 
	socket.on('id', function (data) {
    socket.join(data.id);
	});
	socket.on('disconnect', function () {
		console.log('user disconnected');
  });
  socket.on('addToFriend', function (data) {
    io.sockets.in(data.userid).emit('newFriend');
    // socket.emit('addToFriend', { data: 'add to friend', sockid: socketId });
  });
  socket.on('sendMessage', async (data) => {
    try {
      const message = {
        dialogId: data.dialogId,
        ownerId: data.userid,
        message: data.message,
        recipient: data.userid
      };
      console.log('MESSAGE')
      console.log(message)
      const result = await message_service.addMessage(message);
      await notificationsService.addMessageNotification(message);
      io.sockets.in(data.userid).emit('showMessage', {msg: result.message});
    } catch(e){
      io.sockets.in(data.userid).emit('showMessage', {msg: 'ERROR'});
    } 
  });
});

//
require('dotenv').config({ path: 'config/build.env'});

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use('/', router.userRouter);
app.use('/', router.petRouter);
app.use('/', router.fileRouter);
app.use('/', router.albumRouter);
app.use('/', router.notificationRouter);
app.use('/', router.photoRouter);
app.use('/friends', router.friendsRouter);
app.use('/dialog', router.dialogRouter);
app.use('/message', router.messageRouter);

app.listen(port, function () {
  console.log(`app listening on port ${port}`);
});

http.listen(8080, function(){
  console.log('sockets listening on *:8080');
});

