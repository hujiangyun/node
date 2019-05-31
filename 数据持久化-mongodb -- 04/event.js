const EventEimtter = require('events').EventEmitter
const event = new EventEimtter()
// 监听事件 --- some_event
event.once('some_event', num => {
  console.log('event', num)
})

let num = 0
setInterval(() => {
  event.emit('some_event', num++)
}, 1000)
