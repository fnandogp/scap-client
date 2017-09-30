<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <router-view></router-view>
  </div>
</template>

<script>
  import store from 'src/store'

  export default {
    mounted () {
      store.dispatch('auth/checkToken')
    }
  }
</script>

<style lang="stylus">
  /*@import '~variables'*/
</style>
