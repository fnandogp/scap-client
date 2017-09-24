<template>
  <router-view />
</template>

<script>
  import { LocalStorage } from 'quasar'

  export default {
    data () {
      return {}
    },
    mounted () {
      if (!LocalStorage.get.item('token')) {
        this.$router.push({name: 'auth-login'})
      }
    }
  }
</script>

<style>
</style>
