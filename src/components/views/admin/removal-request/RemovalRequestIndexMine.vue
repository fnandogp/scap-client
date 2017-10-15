<template>
  <div class="layout-padding">

    <q-list highlight>
      <!--header-->
      <q-list-header>
        Removal requests
      </q-list-header>

      <q-item-separator />

      <!--removal request info-->
      <q-item
          v-for="removalRequest in removalRequests"
          :key="removalRequest.id"
          v-if="ready">
        <q-item-main>
          <q-item-tile label>{{ removalRequest.event }} ({{ removalRequest.city }})
          </q-item-tile>
          <q-item-tile sublabel>Type: <strong>{{ removalRequest.type }}</strong></q-item-tile>
          <q-item-tile sublabel>
            Removal from <strong>{{ formatDate(removalRequest.removal_from, 'YYYY-MM-DD') }}</strong>
            to <strong>{{ formatDate(removalRequest.removal_to, 'YYYY-MM-DD') }}</strong>
          </q-item-tile>
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
    QSpinner,
    date
  } from 'quasar'

  console.log('Date:')
  console.log(date)

  export default {
    components: {
      QList, QListHeader, QItem, QItemSide, QItemMain, QItemTile, QItemSeparator, QInnerLoading, QSpinner
    },

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
      store.state.title = 'My removal requests'
      this.fetchMineRemovalRequests()
        .then(() => {
          this.ready = true
        })
    },

    methods: {
      ...mapActions({
        fetchMineRemovalRequests: 'removalRequest/fetchMine'
      }),

      ...date
    }
  }
</script>
