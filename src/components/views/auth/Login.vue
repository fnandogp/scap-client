<template>
  <div class="layout-padding">
    <q-field icon="email">
      <q-input float-label="E-mail" />
    </q-field>

    <q-field icon="https">
      <q-input type="password"
               float-label="Password" />
    </q-field>

    <q-field>
      <q-btn color="primary">Log in</q-btn>
    </q-field>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    }
  }
</script>

<style>
</style>
