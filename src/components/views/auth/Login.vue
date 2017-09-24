<template>
  <div class="layout-padding">
    <q-field icon="email">
      <q-input type="text"
               v-model="email"
               float-label="E-mail" />
    </q-field>

    <q-field icon="https">
      <q-input type="password"
               v-model="password"
               float-label="Password" />
    </q-field>

    <q-field>
      <q-btn color="primary"
             @click="login()">
        Log in
      </q-btn>
    </q-field>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { QField, QInput, QBtn } from 'quasar'

  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      ...mapActions,
      login () {
        this.$http.post('/auth/login', {
          email: this.email,
          password: this.password
        })
          .then((response) => {
            this.login('auth/login', response)
          })
          .catch((response) => {
            console.log(response)
          })
      }
    },
    components: {
      QField, QInput, QBtn
    }
  }
</script>

<style>
</style>
