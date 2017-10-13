<template>
  <div class="layout-padding">

    <q-list>
      <q-list-header>
        Users
      </q-list-header>

      <q-item-separator />

      <q-item
          v-for="user in users"
          :key="user.id"
          v-if="ready">
        <q-item-main>
          <q-item-tile label>{{ user.name }}
            <small>({{ user.email }})</small>
          </q-item-tile>
          <q-item-tile sublabel>{{ user.enrollment }}</q-item-tile>
        </q-item-main>

        <q-item-side
            right
            icon="more vert">

          <q-popover>
            <q-list
                link
                highlight>
              <q-item
                  link :to="{name: 'user.edit', params:{'userId': user.id}}">
                <q-item-side icon="mode edit" />
                <q-item-main>Edit user</q-item-main>
              </q-item>
              <q-item v-if="user.roles.indexOf('professor') !== -1 && !user.is_department_chief">
                <q-item-side icon="trending up" />
                <q-item-main>Make department chief</q-item-main>
              </q-item>
              <q-item separator>
                <q-item-side
                    icon="delete"
                    color="negative" />
                <q-item-main>
                  <q-item-tile
                      color="negative"
                      label>
                    Delete user
                  </q-item-tile>
                </q-item-main>
              </q-item>
            </q-list>
          </q-popover>

        </q-item-side>
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
  import {
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QItemTile,
    QItemSeparator,
    QPopover,
    QInnerLoading,
    QSpinner,
    QBtn
  } from 'quasar'

  export default {
    components: {
      QList,
      QListHeader,
      QItem,
      QItemSide,
      QItemMain,
      QItemTile,
      QItemSeparator,
      QPopover,
      QInnerLoading,
      QSpinner,
      QBtn
    },
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
      this.fetchUsers().then(() => {
        this.ready = true
      })
    },
    methods: {
      ...mapActions({
        fetchUsers: 'user/fetch'
      })
    }
  }
</script>
