const books = {
  match: {
    'vue,react,jq,jquery,bootstrap,lodash,angular,moment,backbone/i'(who) {
      who = who.toLowerCase()
      who === 'angular' ? who = 'angular-icon' : 0
      who === 'backbone' ? who = 'backbone-icon' : 0
      who === 'jq' ? who = 'jquery' : 0
      who === 'moment' ? who = 'momentjs' : 0
      return `https://www.bootcdn.cn/assets/img/${who}.svg`
    },
    'koa/i'(who) {
      who = who.toLowerCase()
      return `https://github.com/koajs/koa/raw/master/docs/logo.png`
    }
  }
}

let hell = []
const makeHell = () => {
  let h = []
  for (let key in books.match) {
    let g = key.split('/')
    let i = g[0].split(',')
    h.push({ reg: new RegExp(i.length > 1 ? '('+i.join('|') +')' : i[0] , g[1]), make: books.match[key] })
  }
  hell = h
  console.log(h)
}
export default (who) => {
  // Be fast
  if (!hell.length) makeHell()
  let t = hell.find(({ reg }) => reg.test(who))
  return t ? t.make(who) : null
}