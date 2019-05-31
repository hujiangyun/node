const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {
  // 响应用户请求发送消息
  socket.on('chat message', msg => {
    console.log('chat message' + msg)
    io.emit('chat message', msg)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

http.listen('3000', () => {
  console.log('App listen at 3000')
})
