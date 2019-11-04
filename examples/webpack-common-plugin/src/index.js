import _ from 'lodash'

import { log } from './lib/util.js'

function component() {
  var element = document.createElement('div')

  // lodash 是由当前 script 脚本 import 进来的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ')

  element.addEventListener('click', log(element.innerHTML))

  return element;
}

document.body.appendChild(component())
