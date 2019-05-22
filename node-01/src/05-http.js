const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  // req => request前端发送的请求对象
  // res => response后端返回给前端的对象
  const { url, method, headers } = req
  // url => 前端请求的url
  // method => 前端请求的方法：get，post
  if (url === '/' && method === 'GET') {
    fs.readFile('./index.html', (err, data) => {
      if (err) { // 出现错误
        res.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8' })
        res.end('serve 服务器出错了')
      }
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      res.end(data)
    })
  } else if (url === '/users' && method === 'GET') {
    // 返回一个json对象
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ name: 'tom', age: 18 }))
  } else if (method === 'GET' && headers.accept.indexOf('image/*') !== -1) {
    // 流操作
    fs.createReadStream('.' + url).pipe(res)
  }
})

server.listen(3000)
