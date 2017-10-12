import http from 'src/http'

export default {
  user: {
    index: () => http.get('/users'),
    show: ({userId}) => http.get('/users', {userId}),
    create: ({name, email, enrollment, password, roles}) => http.post('/users', {name, email, enrollment, password, roles})
  }
}
