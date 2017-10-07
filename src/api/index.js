import auth from './auth'
import user from './user'
import removalRequest from './removalRequest'

export default {
  ...auth,
  ...user,
  ...removalRequest
}
