const net = require('net')
const chatServe = net.createServer()

const clientList = []

chatServe.on('connection', client => {
    client.write('Hi\n')
    clientList.push(client)
    client.on('data', data => {
        console.log('reveice', data.toString());
        clientList.forEach(v => {
            v.write(data)
        })
    })
})

chatServe.listen(9000, () => {
    console.log('App listen at 9000');
})

// http返回码：
//  1xx:指示信息--请求已经接收，将要继续处理。
//  2xx:成功--请求已经接收成功、理解、接收。（一般为200）。
//  3xx:重定向--要完成请求必须进一步操作。
//  4xx:客户端错误--请求有语法错误或者请求无法实现。(404,401)
//  5xx:服务器端错误--服务器未能实现合法请求。(500,502)