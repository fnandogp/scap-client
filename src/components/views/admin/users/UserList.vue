<template>
  <div class="layout-padding">

    <q-list>
      <q-list-header>Users</q-list-header>
      <q-item
              v-for="user in users"
              :key="user.id"
              v-if="ready">
        <q-item-main>
          <q-item-tile label>{{ user.name }}</q-item-tile>
          <q-item-tile sublabel>{{ user.enrollment }}</q-item-tile>
        </q-item-main>
        <!--<q-item-side right>-->
        <!--<q-item-tile icon="more_vert" />-->
        <!--</q-item-side>-->
      </q-item>

      <q-item v-if="ready && (users.length == 0)">
        <q-item-side icon="info_outline" />
        <q-item-main sublabel="No users found." />
      </q-item>

      <q-item v-if="!ready">
        <q-inner-loading :visible="!ready">
          <q-spinner color="primary" :size="40" />
        </q-inner-loading>
      </q-item>
    </q-list>

  </div>
</template>

<script>
  import store from 'src/store'
  import { mapState, mapActions } from 'vuex'
  import { QList, QListHeader, QItem, QItemSide, QItemMain, QItemTile, QInnerLoading, QSpinner } from 'quasar'

  export default {
    data () {
      return {
        ready: false
      }
    },
    computed: {
      ...mapState({
        users: state => state.user.list
      })
    },
    mounted () {
      store.state.title = 'Users'
      this.fetchUsers()
        .then(() => {
          this.ready = true
        })
    },
    components: {
      QList, QListHeader, QItem, QItemSide, QItemMain, QItemTile, QInnerLoading, QSpinner
    },
    methods: {
      ...mapActions({
        fetchUsers: 'user/fetch'
      })
    }
  }
</script>
