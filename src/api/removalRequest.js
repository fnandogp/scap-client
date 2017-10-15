import http from 'src/http'

export default {
  removalRequest: {
    index: () => http.get('/removal-requests'),

    indexMine: () => http.get('/me/removal-requests'),

    show: ({removalRequestId}) => http.get('/removal-requests/',
      {removalRequestId}),

    create: ({type, removal_from, removal_to, event_from, event_to, event, city, removal_reason, onus}) => http.post('/removal-requests', {
      type, removal_from, removal_to, event_from, event_to, event, city, removal_reason, onus
    })
  }
}
