import Vue from 'vue'
import axios from 'axios'
import {
  Alert,
  LocalStorage,
  Toast
} from 'quasar'

console.log(process.env.API_URL)

const http = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    // 'Authorization': 'Bearer {token}',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

if (LocalStorage.get.item('token')) {
  console.log(http)
  console.log(http.headers)
}

http.interceptors.response.use((response) => {
  console.log('Response:')
  console.log(response)
}, (response) => {
  let res = response.response
  console.log('Error:')
  console.log(res)

  let errors = res.data.errors

  if (res.status === 200) {
    Toast.create({
      color: 'positive',
      html: response.message
    })
  }

  if (res.status === 422) {
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
})

Vue.prototype.$http = http
