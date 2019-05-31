const express = require('express')
const db = require('./models')
const PORT = process.env.PORT || 3000
let app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// 指定静态目录
app.use(express.static('./public'))

// Router
require('./router/app-route')(app)

db.sequelize.sync().then(re => {
  app.listen(PORT, () => {
    console.log(`app listen at ${PORT}`)
  })
})
