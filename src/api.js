import Vue from 'vue'
import axios from 'axios'
import store from 'src/store'

const http = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    // 'Authorization': 'Bearer {token}',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

http.interceptors.response.use((response) => {
  console.log('Response:')
  console.log(response)
}, (response) => {
  let res = response.response
  console.log('Error:')
  console.log(res)

  let errors = res.data.errors

  if (res.status === 422) {
    let payload = {}
    let messages = []

    for (let key in errors) {
      for (let message of errors[key]) {
        messages.push(message)
      }
    }

    payload.type = 'error'
    payload.messages = messages

    store.dispatch('SET_ALERTS', payload)
  }
})

Vue.prototype.$http = http
