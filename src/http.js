import Vue from 'vue'
import axios from 'axios'
import { Alert } from 'quasar'

const http = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

http.interceptors.response.use((response) => {
  if (response.data.message) {
    let alert = Alert.create({
      color: 'positive',
      html: response.data.message
    })

    setTimeout(() => {
      // Alert for 5 seconds
      alert.dismiss()
    }, 5000)
  }

  return response
}, (response) => {
  let errors = response.data.errors

  if (response.status === 422) {
    let messages = []

    for (let key in errors) {
      for (let message of errors[key]) {
        messages.push(message)
      }
    }
    Alert.create({
      color: 'negative',
      html: messages
    })
  }

  return response
})

Vue.prototype.$http = http

export default http
