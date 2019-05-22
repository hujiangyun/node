const http = require('http')
const url = require('url')

let router = []
class Application {
    get(url,handler){
        router.push({
            url,
            method: 'get',
            handler
        })
    }
    listen(){
        const server = http.createServer((req,res) => {
            const {pathname} = url.parse(req.url,true)
            // for (const item of router) {
            //     const {url,method,handler} = item
            //     if(pathname === url && method === req.method.toLowerCase()){
            //         return handler(req,res)
            //     }
            // }
            return router
                .find(v => pathname === v.url && v.method === req.method.toLowerCase())
                .handler(req,res)
        })
        server.listen(...arguments)
        // console.log(router);
    }
}


module.exports = function (){
    return new Application()
}