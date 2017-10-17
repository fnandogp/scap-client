export default {
  professors (state) {
    return state.list.filter(user => user.roles && user.roles.indexOf('professor') !== -1)
  }
}
