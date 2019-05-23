const http = require('http')
const fs = require('fs')
const server = http.createServer()

server((req, res) => {
    const { method, url } = req
    if (url === '/' && method === 'GET') {
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": 'text/plain;charset=utf-8' })
                res.end("出错啦")
            }
            res.writeHead(200, { "Content-Type": 'text/html' })
            res.end(data)
        })
    } else if (url === '/users' && method === "GET") {
        res.writeHead(200, { "Content-Type": 'application/json' })
        res.end(JSON.stringify({ name: 'tom', age: 18 }))
    }
})
server.listen(3000, () => {
    console.log('App listen at 3000');
})