// import _ from 'lodash';

// staticly import
// function component() {
//   var element = document.createElement('div');
//   // Lodash, now imported by this script
//   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
// }
// document.body.appendChild(component());

// dynamicly import
// function getComponent() {
//   return import(/* webpackChunkName: "lodash" */ 'lodash').then(( { default: _ }) => {
//     var element = document.createElement('div');
//     // Lodash, now imported by this script
//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//     return element;
//   }).catch(error => 'an error occurred while loading the component')
// }

// async dynamicly import
async function getComponent() {
  try {
    const { default: _ } = await import(/* webpackChunkName: "lodash" */ 'lodash')
    const element = document.createElement('div');
    element.innerHTML = _.join(['hello', 'webpack'], ' ');
    return element;
  }
  catch (error) {
    return 'an error occurred while loading the component'
  }
}

getComponent().then(component => {
  document.body.appendChild(component)
})
