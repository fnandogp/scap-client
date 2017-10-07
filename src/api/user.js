import http from 'src/http'

export default {
  user: {
    index: () => http.get('/users'),
    show: ({user_id}) => http.get('/users', {user_id})
  }
}
