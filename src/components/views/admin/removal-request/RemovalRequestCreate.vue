<template>
  <div class="layout-padding row justify-center">
    <div class="col-12">

      <q-list>
        <q-list-header>
          Type
        </q-list-header>
        <q-item>
          <q-radio
              v-model="type"
              val="national"
              label="National" />
        </q-item>
        <q-item>
          <q-radio
              v-model="type"
              val="international"
              label="International" />
        </q-item>

        <q-item-separator />

        <q-list-header>
          Removal interval
        </q-list-header>
        <q-item>
          <q-item-side icon="date range" />
          <q-item-main>
            <q-datetime
                v-model="removalFrom"
                float-label="Removal from"
                :min="today" />
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-side icon="date range" />
          <q-item-main>
            <q-datetime
                v-model="removalTo"
                float-label="Removal to"
                :min="removalFrom ? removalFrom : today" />
          </q-item-main>
        </q-item>

        <q-item-separator />

        <q-list-header>
          Event
        </q-list-header>
        <q-item class="row">
          <q-input
              v-model="eventName"
              type="text"
              float-label="Name"
              class="col-12" />
        </q-item>
        <q-item class="row">
          <q-input
              v-model="eventCity"
              type="text"
              float-label="City"
              class="col-12" />
        </q-item>
        <q-item>
          <q-item-side icon="date range" />
          <q-item-main>
            <q-datetime
                v-model="eventFrom"
                float-label="Event from"
                :min="today" />
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-side icon="date range" />
          <q-item-main>
            <q-datetime
                v-model="eventTo"
                float-label="Evento to"
                :min="eventFrom ? eventFrom : today" />
          </q-item-main>
        </q-item>

        <q-item-separator />

        <q-list-header>
          Reason
        </q-list-header>
        <q-item>
          <q-input
              type="textarea"
              class="col-12"
              v-model="reason"
              :min-rows="5" />
        </q-item>

        <q-item-separator />

        <q-list-header>
          Onus
        </q-list-header>
        <q-item>
          <q-radio
              v-model="onus"
              val="total"
              label="Total" />
        </q-item>
        <q-item>
          <q-radio
              v-model="onus"
              val="partial"
              label="Partial" />
        </q-item>
        <q-item>
          <q-radio
              v-model="onus"
              val="none"
              label="None" />
        </q-item>
      </q-list>

      <q-field>
        <q-btn color="primary"
               @click="submit()">
          Create
        </q-btn>
      </q-field>
    </div>
  </div>
</template>

<script>
  import {
    QField, QInput, QCheckbox, QBtn, QRadio, QDatetime, QList, QListHeader, QItem, QItemSide, QItemMain, QItemTile,
    QItemSeparator
  } from 'quasar'
  import { mapActions } from 'vuex'
  import store from 'src/store'

  let today = new Date()

  export default {
    components: {
      QField,
      QInput,
      QCheckbox,
      QBtn,
      QRadio,
      QDatetime,
      QList,
      QListHeader,
      QItem,
      QItemSide,
      QItemMain,
      QItemTile,
      QItemSeparator
    },
    data () {
      return {
        type: 'national',
        removalFrom: '',
        removalTo: '',
        eventFrom: '',
        eventTo: '',
        eventName: '',
        eventCity: '',
        reason: '',
        onus: '',
        today
      }
    },
    computed () {

    },
    mounted () {
      store.state.title = 'Create a new removal request'
    },
    methods: {
      ...mapActions({
        removalRequestCreate: 'removalRequest/create'
      }),
      submit () {
        let {
          type,
          removalFrom,
          removalTo,
          eventFrom,
          eventTo,
          eventName,
          eventCity,
          reason,
          onus
        } = this

        this.removalRequestCreate({type, removalFrom, removalTo, eventFrom, eventTo, eventName, eventCity, reason, onus})
          .then(() => {
            this.$router.push({name: 'me.removal-request.index'})
          })
      }
    }
  }
</script>

<style>

</style>