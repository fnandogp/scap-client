import http from 'src/http'

export default {
  user: {
    index: () => http.get('/users'),

    show: (id) => http.get(`/users/${id}`),

    create: ({name, email, enrollment, password, roles}) =>
      http.post('/users', {name, email, enrollment, password, roles}),

    delete: (id) => http.delete(`/users/${id}`)
  }
}
