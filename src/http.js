import axios from 'axios'
import { Alert } from 'quasar'
import Vue from 'vue'

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
  let errors = response.response.data.errors

  //  if (response.request.status === 422) {
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
  //  }

  return Promise.reject(new Error(response))
})

Vue.prototype.$http = http

export default http
