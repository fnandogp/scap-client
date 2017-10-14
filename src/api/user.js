import http from 'src/http'
import { date } from 'quasar'

export default {
  user: {
    index: () => http.get('/users'),

    show: (userId) => http.get(`/users/${userId}`),

    create: ({name, email, enrollment, password, roles}) =>
      http.post('/users', {name, email, enrollment, password, roles}),

    delete: (userId) => http.delete(`/users/${userId}`),

    assignDepartmentChief: (userId) =>
      http.post(`/users/${userId}/department-chief`,
        {date_from: date.formatDate(Date.now(), 'YYYY-MM-DD')})
  }
}
