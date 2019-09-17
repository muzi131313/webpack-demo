function moduleIndex() {
  console.log('module index')
}

export default async function getPrint() {
  const func = await import('./util.js')
  return func.default
}
