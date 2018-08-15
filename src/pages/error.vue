<template>
  <div>
    <p style="color: red">请求报错的错误页面</p>
    <p style="color: orange">暂时没有相关页面</p>
    <span>错误码：{{ $route.params.status }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  }
}
</script>

<style scoped>

</style>
