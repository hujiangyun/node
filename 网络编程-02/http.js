const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const { method, url } = req;
    // console.log('method', method);
    if (method === 'OPTIONS') {
        // 当前端发送复杂请求时,客户端会发送一个预检请求（如自定义headers：token，或者使用 GET，POST等以外的请求方法）
        res.writeHead(200, {
            // 设置可跨域的域名
            "Access-Control-Allow-Origin": "http://127.0.0.1:8080",
            // 设置可跨服自定义的headers
            "Access-Control-Allow-Headers": "X-Token,Conten-Type",
            // 设置跨域复杂请求的方法
            "Access-Control-Allow-Methods": "PUT,DELETE"
        })
        res.end();
    }
    // 加入"Access-Control-Allow-Origin"报头，允许跨域请求域名(简单请求)
    // res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
    if (url === '/' && method === 'GET') {
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": 'text/plain;charset=utf-8' })
                res.end("出错啦")
            }
            res.writeHead(200, { "Content-Type": 'text/html' });
            res.end(data);
        });
    } else if (url === '/users' && method === "GET") {
        const headers = {
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": "http://127.0.0.1:8080"
        };
        res.writeHead(200, headers);
        res.end(JSON.stringify({ name: 'tom', age: 18 }));
    }
})
server.listen(3000, () => {
    console.log('App listen at 3000');
});