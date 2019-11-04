<template>
  <div id="app">
    <header>header</header>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
#app {
  h1 {
    font-size: 24px;
    color: #333;
  }
}
</style>
