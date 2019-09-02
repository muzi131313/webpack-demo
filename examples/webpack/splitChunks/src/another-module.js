import _ from 'lodash'

import { log } from './lib/util'

const array = ['another', 'module']
const str = _.join(array, ' ')
log(str)
