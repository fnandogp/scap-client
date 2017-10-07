<template>
  <div class="layout-padding">
    <q-list highlight>
      <q-list-header>Users</q-list-header>
      <q-item>
        <!--<q-item-side avatar="/statics/boy-avatar.png" />-->
        <q-item-main>
          <q-item-tile label>Name</q-item-tile>
          <q-item-tile sublabel>Enrollment</q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-item-tile icon="more_vert" />
        </q-item-side>
      </q-item>
    </q-list>
  </div>
</template>

<script>
  import store from 'src/store'
  import { QList, QListHeader, QItem, QItemSide, QItemMain, QItemTile } from 'quasar'

  export default {
    mounted () {
      store.state.title = 'Users'
    },
    components: {
      QList, QListHeader, QItem, QItemSide, QItemMain, QItemTile
    }
  }
</script>

<style>

</style>