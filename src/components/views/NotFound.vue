<template>

  <div id="not-found">
    <q-card color="warning">

      <q-card-title>
        <h3>Not Found</h3>

        <div slot="right" class="row items-center">
          <q-icon name="report" size="5em" />
        </div>
      </q-card-title>

      <q-card-main>
        This page does not exist.
      </q-card-main>

      <q-card-separator />

      <q-card-actions>
        <q-btn flat @click="$router.push({name:'home'})">
          Go to Home
        </q-btn>
      </q-card-actions>

    </q-card>


  </div>
</template>

<script>
  import { QBtn, QCard, QCardTitle, QCardMain, QCardSeparator, QCardActions, QIcon } from 'quasar'

  export default {
    components: {
      QBtn, QCard, QCardTitle, QCardMain, QCardSeparator, QCardActions, QIcon
    }
  }
</script>

<style>

</style>