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
             @click="submit()">
        Log in
      </q-btn>
    </q-field>
  </div>
</template>

<script>
  import { QField, QInput, QBtn } from 'quasar'
  import store from 'src/store'
  import { mapActions } from 'vuex'

  export default {
    components: {QField, QInput, QBtn},
    data () {
      return {
        email: 'admin@example.com',
        password: 'secret'
      }
    },
    methods: {
      ...mapActions({attemptLogin: 'auth/attemptLogin'}),
      submit () {
        let {email, password} = this
        this.attemptLogin({email, password})
          .then((response) => {
            this.$router.push({name: 'home'})
          })
      }
    },
    mounted () {
      store.commit('SET_TITLE', 'Login')
    }
  }
</script>
