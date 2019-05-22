// const express = require('express')

const express = require('./kexpress')

const app = express()

app.get('/',(req,res) => {
    res.end('HelloWord.....')
})

app.get('/user',(req,res) => {
    res.end(JSON.stringify({name: 'tom',age: 18}))
})

app.listen(3000,() => {
    console.log('App is listen 3000')  
})