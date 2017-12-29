<template>
  <div class="layout-padding">
    <q-field icon="assignment ind">
      <q-input type="text"
               v-model="name"
               float-label="Name" />
    </q-field>

    <q-field icon="email">
      <q-input type="text"
               v-model="email"
               float-label="E-mail" />
    </q-field>

    <q-field icon="picture in picture">
      <q-input type="text"
               v-model="enrollment"
               float-label="Enrollment" />
    </q-field>

    <q-field icon="https">
      <q-input type="password"
               v-model="password"
               float-label="Password" />
    </q-field>

    <q-field>
      <p class="caption">Roles</p>
      <q-checkbox v-model="roles" val="admin" label="Administrator" />
      <br>
      <q-checkbox v-model="roles" val="professor" label="Professor" />
      <br>
      <q-checkbox v-model="roles" val="secretary" label="Secretary" />
    </q-field>

    <q-field>
      <q-btn color="primary"
             @click="submit()">
        Create
      </q-btn>
    </q-field>
  </div>
</template>

<script>
  import { QField, QInput, QCheckbox, QBtn } from 'quasar'
  import { mapActions } from 'vuex'
  import store from 'src/store'

  export default {
    components: {QField, QInput, QCheckbox, QBtn},
    data () {
      return {
        name: '',
        email: '',
        enrollment: '',
        password: '',
        roles: []
      }
    },
    computed () {

    },
    mounted () {
      store.state.title = 'Create a new user'
    },
    methods: {
      ...mapActions({
        'userCreate': 'user/create'
      }),
      submit () {
        let {name, email, enrollment, password, roles} = this
        this.userCreate({name, email, enrollment, password, roles}).then(() => {
          console.log()

          this.$router.push({name: 'user.index'})
        })
      }
    }
  }
</script>

<style>

</style>
