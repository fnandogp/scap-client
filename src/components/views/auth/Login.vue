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
  import { QField, QInput, QBtn } from 'quasar'
  import store from 'src/store'

  export default {
    data () {
      return {
        email: 'admin@example.com',
        password: 'secret'
      }
    },
    methods: {
      login () {
        this.$http.post('/auth/login', {
          email: this.email,
          password: this.password
        })
          .then((response) => {
            this.$store.dispatch('auth/login', response.data)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    mounted () {
      store.commit('SET_TITLE', 'Login')
    },
    components: {
      QField, QInput, QBtn
    }
  }
</script>
