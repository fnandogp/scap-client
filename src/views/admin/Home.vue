<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <h1>Welcome!</h1>
  </div>
</template>

<script>
  import store from 'src/store'

  export default {
    data () {
      return {}
    },
    mounted () {
      store.commit('SET_TITLE', 'Home')
    }
  }
</script>

<style>
</style>
