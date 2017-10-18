import http from 'src/http'
import { date } from 'quasar'

export default {
  removalRequest: {
    index: () => http.get('/removal-requests'),

    indexMine: () => http.get('/me/removal-requests'),

    show: ({removalRequestId}) => http.get('/removal-requests/',
      {removalRequestId}),

    create: ({type, removalFrom, removalTo, eventFrom, eventTo, eventName, eventCity, reason, onus}) => {
      let data = {
        type,
        removal_from: date.formatDate(removalFrom, 'YYYY-MM-DD'),
        removal_to: date.formatDate(removalTo, 'YYYY-MM-DD'),
        event_from: date.formatDate(eventFrom, 'YYYY-MM-DD'),
        event_to: date.formatDate(eventTo, 'YYYY-MM-DD'),
        event: eventName,
        city: eventCity,
        removal_reason: reason,
        onus
      }

      return http.post('/removal-requests', data)
    },

    chooseRapporteur: ({removalRequestId, rapporteurId}) => {
      let data = {
        rapporteur_id: rapporteurId
      }
      return http.patch(`/removal-requests/${removalRequestId}/choose-rapporteur`, data)
    },

    deferOpinion: ({removalRequestId, type, reason}) => http.post(`/removal-requests/${removalRequestId}/defer-opinion`, {type, reason}),

    registerCtOpinion: ({removalRequestId, type, reason}) => http.post(`/removal-requests/${removalRequestId}/register-ct-opinion`, {type, reason}),

    registerPrppgOpinion: ({removalRequestId, type, reason}) => http.post(`/removal-requests/${removalRequestId}/register-prppg-opinion`, {type, reason}),

    manifestAgainst: ({removalRequestId, reason}) => http.post(`/removal-requests/${removalRequestId}/manifest-against`, {reason})
  }
}
