import http from 'src/http'

export default {
  removalRequest: {
    index: () => http.get('/removal-requests'),
    show: ({removalRequestId}) => http.get('/removal-requests/', {removalRequestId})
  }
}
