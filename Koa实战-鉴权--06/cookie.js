const http = require('http')
const session = {}
const app = http.createServer((req, res) => {
  const sessionKey = 'sid'
  if (req.url === 'favicon.icon') return
  const { cookie } = req.headers
  if (cookie && cookie.indexOf(sessionKey) > -1) {
    // 如果response里面有cookie说明用户登录过
    const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`)
    const sid = pattern.exec(cookie)[1]
    console.log('session：', sid, session, session[sid])
    res.end('goBack')
  } else {
    // 第一次登录或者过期
    const sid = (Math.random() * 99999999).toFixed()
    res.setHeader('Set-Cookie', `${sessionKey}=${sid}`)
    session[sid] = { name: 'tom' }
    res.end('nihao cookie')
  }
})

app.listen(3000)
