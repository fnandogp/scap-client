import http from 'src/http'

export default {
  me: () => http.get('/auth/me'),
  attemptLogin: ({email, password}) => http.post('/auth/login', {email, password}),
  logout: () => http.delete('/auth/logout')
}
