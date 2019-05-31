// const add = (x, y) => x + y
// const squaer = z => z * z
// // const fn = (x, y) => squaer(add(x, y))
// // const compose = (fn1, fn2) => (...args) => fn2(fn1(...args))

// // 组合式函数
// const compose = (...[first, ...others]) => (...args) => {
//   let ret = first(...args)
//   //others多个函数
//   others.forEach(fn => {
//     ret = fn(ret)
//   })
//   return ret
// }
// const fn = compose(
//   add,
//   squaer,
//   squaer
// )

// console.log(fn(1, 2))

async function fn1(next) {
  console.log('fn1')
  await next()
  console.log('end fn1')
}

async function fn2(next) {
  console.log('fn2')
  await delay()
  await next()
  console.log('end fn2')
}

function fn3(next) {
  console.log('fn3')
}
function delay() {
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      reslove()
    }, 2000)
  })
}

const middleware = [fn1, fn2, fn3]
const finalFn = componse(middleware)
finalFn()

function componse(middleware) {
  return function() {
    return dispatch(0)

    function dispatch(i) {
      let fn = middleware[i]
      if (!fn) {
        return Promise.resolve()
      }
      return Promise.resolve(
        fn(function next() {
          return dispatch(i + 1)
        })
      )
    }
  }
}
