export function storage() {
  const setProperties = function() {
    localStorage.setItem('projects', '{}')
    localStorage.setItem('currentMaxProjectId', '0')
    localStorage.setItem('currentMaxTodoId', '0')
    localStorage.setItem('currentProjectId', '0')
  }

  const storeProject = function(project, previouslyUsedId) {
    project = JSON.parse(project)
    if (previouslyUsedId === undefined) {
      localStorage.setItem('currentMaxProjectId', JSON.stringify(project.id))
    }
    const projectList = JSON.parse(localStorage.getItem('projects'))
    projectList[project.id] = project
    localStorage.setItem('projects', JSON.stringify(projectList))
  }

  const updateCurrentProject = function(project) {
    localStorage.setItem('currentProjectId', JSON.stringify(project.id))
  }

  const removeProject = function(projectId) {
    const projectList = JSON.parse(localStorage.getItem('projects'))
    delete projectList[projectId]
    localStorage.setItem('projects', JSON.stringify(projectList))
  }

  return { setProperties, storeProject, updateCurrentProject, removeProject }
}
