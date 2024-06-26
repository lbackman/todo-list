export default (function projectList() {
  const _projects = {}
  let _currentProjectId

  return {
    get currentProjectId() {
      return _currentProjectId
    },

    set currentProjectId(id) {
      _currentProjectId = id
    },

    get projects() {
      return _projects
    },

    get currentProject() {
      return _projects[_currentProjectId]
    },

    addProject(project) {
      _projects[project.id] = project
      _currentProjectId = project.id
    },

    removeProject(id) {
      delete _projects[id]
    }
  }
})()
