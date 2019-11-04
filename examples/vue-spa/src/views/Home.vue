<template>
  <div class="index">
    <h2>index</h2>
    <div class="img"></div>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
.index {
  h2 {
    font-size: 22px;
    color: #333;
  }
  .img {
    height: 100px;
    width: 150px;
    background: url(~@/assets/wind.jpg) center center no-repeat;
    background-size: contain;
  }
}
</style>
