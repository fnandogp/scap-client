export default {
  SET_REMOVAL_REQUESTS (state, removalRequests) {
    state.list = removalRequests
  },

  UPDATE_LIST_ITEM (state, payload) {
    let oldList = state.list
    let index = state.list.findIndex((element) => {
      return element.id === payload.id
    })

    oldList[index] = payload
    state.list = []
    state.list = oldList
  }
}
