export default {
  methods: {
    /**
     * Indicate if a user can choose a rapporteur of a removal request
     *
     * @param user
     * @param removalRequest
     * @return boolean
     */
    canChooseRapporteur (user, removalRequest) {
      if (user.roles.indexOf('admin') === -1 && user.roles.indexOf('professor') === -1) {
        return false
      }

      if (removalRequest.type === 'National' || removalRequest.status !== 'Started') {
        return false
      }

      return user.roles.indexOf('admin') !== -1 || (user.roles.indexOf('professor') !== -1 && user.is_department_chief)
    },

    /**
     * Indicate if a user can defer a opinion for a removal request
     *
     * @param user
     * @param removalRequest
     * @return boolean
     */
    canDeferOpinion (user, removalRequest) {
      if (user.roles.indexOf('admin') === -1 && user.roles.indexOf('professor') === -1) {
        return false
      }

      if (removalRequest.type !== 'International' || removalRequest.status !== 'Released') {
        return false
      }

      return user.roles.indexOf('admin') !== -1 ||
        (removalRequest.rapporteur && removalRequest.rapporteur.id === user.id)
    },

    /**
     * Indicate if a user can register a opinion of the CT for a removal request
     *
     * @return Boolean
     * @param user
     * @param removalRequest
     * @return boolean
     */
    canRegisterCtOpinion (user, removalRequest) {
      if (user.roles.indexOf('admin') === -1 && user.roles.indexOf('secretary') === -1) {
        return false
      }

      return removalRequest.type === 'International' && removalRequest.status === 'Approved-DI'
    },

    /**
     * Indicate if a user can register a opinion of the PRPPG for a removal request
     *
     * @param user
     * @param removalRequest
     * @returns {boolean}
     */
    canRegisterPrppgOpinion (user, removalRequest) {
      if (user.roles.indexOf('admin') === -1 && user.roles.indexOf('secretary') === -1) {
        return false
      }

      return removalRequest.type === 'International' && removalRequest.status === 'Approved-CT'
    },

    /**
     * Indicate if a user can manifest against a removal request
     *
     * @param user
     * @param removalRequest
     * @returns {boolean}
     */
    canManifestAgainst (user, removalRequest) {
      if (user.roles.indexOf('admin') === -1 && user.roles.indexOf('professor') === -1) {
        return false
      }

      return removalRequest.type === 'National' && removalRequest.status === 'Released'
    },

    /**
     * Helper to know if a user can do any of the following actions
     *
     * @param user
     * @param removalRequest
     * @return boolean
     */
    canAny (user, removalRequest) {
      return this.canChooseRapporteur(user, removalRequest) || this.canDeferOpinion(user, removalRequest) ||
        this.canRegisterCtOpinion(user, removalRequest) || this.canRegisterPrppgOpinion(user, removalRequest) ||
        this.canManifestAgainst(user, removalRequest)
    }
  }
}
