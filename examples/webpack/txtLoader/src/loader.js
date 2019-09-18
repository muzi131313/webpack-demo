import { getOptions } from 'loader-utils'

export default function loader (source) {
  const options = getOptions(this)

  source = source.replace(/\[name\]/, options.name)

  return `export default ${JSON.stringify(source)}`
}
