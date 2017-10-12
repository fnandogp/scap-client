<template>
  <q-fixed-position
          corner="bottom-right"
          :offset="[18, 18]">
    <q-btn
            round
            color="primary"
            @click="redirect()">
      <q-icon name="add" />
    </q-btn>
  </q-fixed-position>
</template>

<script>
  import { QFixedPosition, QBtn, QIcon } from 'quasar'

  export default {
    components: {
      QFixedPosition, QBtn, QIcon
    },
    methods: {
      redirect () {
        this.$router.push({name: 'user.create'})
      }
    }
  }
</script>