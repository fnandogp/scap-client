<template>
  <div class="layout-padding">
    <q-list highlight>
      <!--header-->
      <q-list-header>
        Removal Requests
      </q-list-header>

      <q-item-separator />

      <!--removal request info-->
      <div v-if="ready">
        <q-item
            v-for="(removalRequest, index) in removalRequests"
            :key="removalRequest.id">
          <q-item-main>
            <q-item-tile label>{{ removalRequest.user.data.name }} ({{ removalRequest.user.data.enrollment }})
            </q-item-tile>
            <q-item-tile sublabel>Type:
              <strong>{{ removalRequest.type }}</strong>
            </q-item-tile>
            <q-item-tile sublabel>
              Removal from
              <strong>{{ formatDate(removalRequest.removal_from, 'YYYY-MM-DD') }}</strong>
              to
              <strong>{{ formatDate(removalRequest.removal_to, 'YYYY-MM-DD') }}</strong>
            </q-item-tile>
            <q-item-tile sublabel>Status:
              <strong>{{ removalRequest.status }}</strong>
            </q-item-tile>
          </q-item-main>

          <!-- Actions-->
          <q-item-side
              right
              icon="more vert">
            <q-popover ref="popover">
              <q-list
                  link
                  highlight>
                <!--v-if="currentUser.roles.indexOf('admin') !== -1 && currentUser.is_department_chief"-->
                <q-item @click="confirmChooseRapporteur(removalRequest), $refs.popover[index].close()">
                  <q-item-side icon="forward" />
                  <q-item-main>
                    Choose rapporteur
                  </q-item-main>
                </q-item>

                <q-item @click="confirmDeferPositiveOpinion(removalRequest), $refs.popover[index].close()">
                  <q-item-side icon="thumb up" />
                  <q-item-main>
                    Defer positive opinion
                  </q-item-main>
                </q-item>

                <q-item @click="confirmDeferNegativeOpinion(removalRequest), $refs.popover[index].close()">
                  <q-item-side icon="thumb down" />
                  <q-item-main>
                    Defer negative opinion
                  </q-item-main>
                </q-item>

                <!--<q-item-->
                <!--v-if="user.roles.indexOf('professor') !== -1 && !user.is_department_chief"-->
                <!--@click="confirmAssignDepartmentChief(user), $refs.popover[index].close()">-->
                <!--<q-item-side icon="trending up" />-->
                <!--<q-item-main>Assign department chief</q-item-main>-->
                <!--</q-item>-->

                <!--<q-item separator @click="confirmDelete(user), $refs.popover[index].close()">-->
                <!--<q-item-side-->
                <!--icon="delete"-->
                <!--color="negative" />-->
                <!--<q-item-main>-->
                <!--<q-item-tile-->
                <!--color="negative"-->
                <!--label>-->
                <!--Delete user-->
                <!--</q-item-tile>-->
                <!--</q-item-main>-->
                <!--</q-item>-->
              </q-list>
            </q-popover>
          </q-item-side>
        </q-item>
        <q-item v-if="removalRequests.length == 0">
          <q-item-side icon="info_outline" />
          <q-item-main sublabel="No removal requests found." />
        </q-item>
      </div>

      <div v-else>
        <q-item>
          <q-inner-loading :visible="!ready">
            <q-spinner color="primary" :size="40" />
          </q-inner-loading>
        </q-item>
      </div>
    </q-list>
  </div>
</template>

<script>
  import store from 'src/store'
  import { mapState, mapActions, mapGetters } from 'vuex'
  import {
    Dialog,
    date,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QItemTile,
    QItemSeparator,
    QInnerLoading,
    QSpinner,
    QPopover
  } from 'quasar'

  export default {
    data () {
      return {
        ready: false,

        opinion: ''
      }
    },
    computed: {
      ...mapState({
        currentUser: state => state.auth.user,

        removalRequests: state => state.removalRequest.list
      }),

      ...mapGetters({
        professors: 'user/professors'
      })
    },
    mounted () {
      store.state.title = 'Removal Requests'
      this.fetch()
        .then(() => {
          this.ready = true
        })

      this.fetchUsers()
    },
    components: {
      QList, QListHeader, QItem, QItemSide, QItemMain, QItemTile, QItemSeparator, QInnerLoading, QSpinner, QPopover
    },
    methods: {
      ...mapActions({
        fetchUsers: 'user/fetch',

        fetch: 'removalRequest/fetch',

        chooseRapporteur: 'removalRequest/chooseRapporteur'
      }),

      formatDate: date.formatDate,

      confirmChooseRapporteur (removalRequest) {
        let items = []
        for (let index in this.professors) {
          items.push({label: this.professors[index].name, value: this.professors[index].id})
        }

        Dialog.create({
          title: 'Which professor will be the rapporteur?',
          form: {
            professor: {
              type: 'radio',
              model: items[0].value,
              items: items
            }
          },
          buttons: [
            'Cancel',
            {
              label: 'Choose',
              color: 'primary',
              raised: true,
              handler: (data) => {
                let removalRequestId = removalRequest.id,
                  rapporteurId = data.professor

                this.chooseRapporteur({removalRequestId, rapporteurId})
              }
            }
          ]
        })
      },

      confirmDeferPositiveOpinion (removalRequest) {
        Dialog.create({
          title: 'Defer positive opinion',
          form: {
            heading: {
              type: 'heading',
              label: 'Opinion'
            },
            option: {
              type: 'textarea',
              model: ''
            }
          },
          buttons: [
            'Cancel',
            {
              label: 'Defer',
              color: 'primary',
              raised: true,
              handler: () => {
                console.log('positive opinion defered')
              }
            }
          ]
        })
      },

      confirmDeferNegativeOpinion (removalRequest) {
        Dialog.create({
          title: 'Defer negative opinion',
          form: {
            option: {
              type: 'textarea',
              model: ''
            }
          },
          buttons: [
            'Cancel',
            {
              label: 'Defer',
              color: 'negative',
              raised: true,
              handler: () => {
                console.log('negative opinion defered')
              }
            }
          ]
        })
      }
    }
  }
</script>
