<template>
  <!-- Configure "view" prop for QLayout -->
  <q-layout>

    <q-toolbar slot="header">
      <q-toolbar-title>
        {{ title }}
      </q-toolbar-title>
    </q-toolbar>

    <router-view />

  </q-layout>
</template>

<script>
  import { QLayout, QToolbar, QToolbarTitle } from 'quasar'
  import store from 'src/store'

  export default {
    data () {
      return {}
    },
    computed: {
      title: () => store.state.title
    },
    components: {
      QLayout, QToolbar, QToolbarTitle
    }
  }
</script>

<style>
</style>
