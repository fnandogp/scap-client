import http from 'src/http'

export default {
  user: {
    index: () => http.get('/users'),
    show: ({userId}) => http.get('/users', {userId})
  }
}
