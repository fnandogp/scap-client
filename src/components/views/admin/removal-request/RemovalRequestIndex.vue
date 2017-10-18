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

                <q-item @click="confirmDeferOpinion(removalRequest), $refs.popover[index].close()">
                  <q-item-side icon="lightbulb outline" />
                  <q-item-main>
                    Defer opinion
                  </q-item-main>
                </q-item>

                <q-item @click="confirmRegisterCtOpinion(removalRequest), $refs.popover[index].close()">
                  <q-item-side icon="lightbulb outline" />
                  <q-item-main>
                    Register CT opinion
                  </q-item-main>
                </q-item>

                <q-item @click="confirmRegisterPrppgOpinion(removalRequest), $refs.popover[index].close()">
                  <q-item-side icon="lightbulb outline" />
                  <q-item-main>
                    Register PRPPG opinion
                  </q-item-main>
                </q-item>

                <q-item @click="confirmManigestAgainst(removalRequest), $refs.popover[index].close()">
                  <q-item-side icon="lightbulb outline" />
                  <q-item-main>
                    Manifest against
                  </q-item-main>
                </q-item>

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

        chooseRapporteur: 'removalRequest/chooseRapporteur',

        deferOpinion: 'removalRequest/deferOpinion',

        registerCtOpinion: 'removalRequest/registerCtOpinion',

        registerPrppgOpinion: 'removalRequest/registerPrppgOpinion',

        manifestAgainst: 'removalRequest/manifestAgainst'
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

      confirmDeferOpinion (removalRequest) {
        Dialog.create({
          title: 'Defer opinion',
          form: {
            heading1: {
              type: 'heading',
              label: 'Type'
            },
            type: {
              type: 'radio',
              model: 'positive',
              items: [
                {label: 'Positive', value: 'positive'},
                {label: 'Negative', value: 'negative'}
              ]
            },
            heading2: {
              type: 'heading',
              label: 'Reason'
            },
            reason: {
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
              handler: (data) => {
                let removalRequestId = removalRequest.id,
                  type = data.type,
                  reason = data.reason

                this.deferOpinion({removalRequestId, type, reason})
              }
            }
          ]
        })
      },

      confirmRegisterCtOpinion (removalRequest) {
        Dialog.create({
          title: 'Register CT opinion',
          form: {
            heading1: {
              type: 'heading',
              label: 'Type'
            },
            type: {
              type: 'radio',
              model: 'positive',
              items: [
                {label: 'Positive', value: 'positive'},
                {label: 'Negative', value: 'negative'}
              ]
            },
            heading2: {
              type: 'heading',
              label: 'Reason'
            },
            reason: {
              type: 'textarea',
              model: ''
            }
          },
          buttons: [
            'Cancel',
            {
              label: 'Register',
              color: 'primary',
              raised: true,
              handler: (data) => {
                let removalRequestId = removalRequest.id,
                  type = data.type,
                  reason = data.reason

                this.registerCtOpinion({removalRequestId, type, reason})
              }
            }
          ]
        })
      },

      confirmRegisterPrppgOpinion (removalRequest) {
        Dialog.create({
          title: 'Register PRPPG opinion',
          form: {
            heading1: {
              type: 'heading',
              label: 'Type'
            },
            type: {
              type: 'radio',
              model: 'positive',
              items: [
                {label: 'Positive', value: 'positive'},
                {label: 'Negative', value: 'negative'}
              ]
            },
            heading2: {
              type: 'heading',
              label: 'Reason'
            },
            reason: {
              type: 'textarea',
              model: ''
            }
          },
          buttons: [
            'Cancel',
            {
              label: 'Register',
              color: 'primary',
              raised: true,
              handler: (data) => {
                let removalRequestId = removalRequest.id,
                  type = data.type,
                  reason = data.reason

                this.registerPrppgOpinion({removalRequestId, type, reason})
              }
            }
          ]
        })
      },

      confirmManifestAgainst(removalRequest) {
        Dialog.create({
          title: 'Register PRPPG opinion',
          form: {
            heading1: {
              type: 'heading',
              label: 'Type'
            },
            type: {
              type: 'radio',
              model: 'positive',
              items: [
                {label: 'Positive', value: 'positive'},
                {label: 'Negative', value: 'negative'}
              ]
            },
            heading2: {
              type: 'heading',
              label: 'Reason'
            },
            reason: {
              type: 'textarea',
              model: ''
            }
          },
          buttons: [
            'Cancel',
            {
              label: 'Register',
              color: 'primary',
              raised: true,
              handler: (data) => {
                let removalRequestId = removalRequest.id,
                  type = data.type,
                  reason = data.reason

                this.manifestAgainst({removalRequestId, type, reason})
              }
            }
          ]
        })
      }
    }
  }
</script>
