<template>
  <!-- Configure "view" prop for QLayout -->
  <q-layout ref="layout">
    <q-toolbar slot="header">
      <!-- opens drawer below -->
      <q-btn flat class="hide-on-drawer-visible" @click="$refs.layout.toggleLeft()">
        <q-icon name="menu" />
      </q-btn>

      <q-toolbar-title>
        {{ title }}
      </q-toolbar-title>
    </q-toolbar>

    <!--Left Side Panel-->
    <div slot="left">
      <q-list no-border link inset-delimiter>
        <q-list-header>Admin</q-list-header>
        <q-side-link item to="users">
          <q-item-side icon="supervisor account" />
          <q-item-main label="Users" />
        </q-side-link>
        <q-side-link item to="removal-requests">
          <q-item-side icon="class" />
          <q-item-main label="Removal Requests" />
        </q-side-link>

        <q-item-separator />
        <q-item @click="$router.push({name:'auth.login'})">
          <q-item-side icon="exit to app" />
          <q-item-main label="Login" sublabel="TODO: remove after tests" />
        </q-item>
        <q-item @click="exit()">
          <q-item-side icon="exit to app" />
          <q-item-main label="Logout" />
        </q-item>
      </q-list>
    </div>


    <router-view />

  </q-layout>
</template>

<script>
  import {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QListHeader,
    QSideLink,
    QItem,
    QItemSide,
    QItemMain,
    QItemSeparator
  } from 'quasar'
  import { mapActions } from 'vuex'
  import store from 'src/store'

  export default {
    data () {
      return {}
    },
    computed: {
      title: () => store.state.title
    },
    methods: {
      ...mapActions({
        logout: 'auth/logout'
      }),
      exit () {
        this.logout()
        this.$router.push({name: 'auth.login'})
      }
    },
    components: {
      QLayout,
      QToolbar,
      QToolbarTitle,
      QBtn,
      QIcon,
      QList,
      QListHeader,
      QSideLink,
      QItem,
      QItemSide,
      QItemMain,
      QItemSeparator
    }
  }
</script>
