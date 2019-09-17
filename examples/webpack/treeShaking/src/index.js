import getPrint from './module/index.js'
import common from './module/common.js'

const indexSpare = function () {
  console.log('index spare')
}
const func = async () => {
  const print = await getPrint()
  // console.log('getPrint: ', print)
  print('hello')
}

func()
common.print('123')
