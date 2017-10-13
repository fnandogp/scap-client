<template>
  <div class="layout-padding">

    <q-list>
      <q-list-header>Removal Requests</q-list-header>

      <q-item-separator />

      <q-item
              v-for="removalRequest in removalRequests"
              :key="removalRequest.id"
              v-if="ready">
        <q-item-main>
          <q-item-tile label>{{ removalRequest.user.data.name }} ({{ removalRequest.user.data.enrollment }})
          </q-item-tile>
          <q-item-tile sublabel>Type: <strong>{{ removalRequest.type }}</strong></q-item-tile>
          <q-item-tile sublabel>From <strong>{{ removalRequest.removal_from }}</strong>
                                to <strong>{{ removalRequest.removal_from }}</strong></q-item-tile>
          <q-item-tile sublabel>Status: <strong>{{ removalRequest.status }}</strong></q-item-tile>
        </q-item-main>
        <!--<q-item-side right>-->
        <!--<q-item-tile icon="more_vert" />-->
        <!--</q-item-side>-->

      </q-item>

      <q-item v-if="ready && (removalRequests.length == 0)">
        <q-item-side icon="info_outline" />
        <q-item-main sublabel="No removal requests found." />
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
    QInnerLoading,
    QSpinner
  } from 'quasar'

  export default {
    data () {
      return {
        ready: false
      }
    },
    computed: {
      ...mapState({
        removalRequests: state => state.removalRequest.list
      })
    },
    mounted () {
      store.state.title = 'Removal Requests'
      this.fetchRemovalRequests().then(() => {
        this.ready = true
      })
    },
    components: {
      QList, QListHeader, QItem, QItemSide, QItemMain, QItemTile, QItemSeparator, QInnerLoading, QSpinner
    },
    methods: {
      ...mapActions({
        fetchRemovalRequests: 'removalRequest/fetch'
      })
    }
  }
</script>
