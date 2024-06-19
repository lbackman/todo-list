export default (function storage() {
  const setProperties = function() {
    localStorage.setItem('projects', '{}')
    localStorage.setItem('currentMaxProjectId', '0')
    localStorage.setItem('currentMaxTodoId', '0')
    localStorage.setItem('currentProjectId', '0')
  }

  const storeProject = function(project, previouslyUsedId) {
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

  const storeTodo = function(todo, project, previouslyUsedId) {
    const projectList = JSON.parse(localStorage.getItem('projects'))
    if (previouslyUsedId === undefined) {
      localStorage.setItem('currentMaxTodoId', JSON.stringify(todo.id))
    }
    projectList[project.id].todos[todo.id] = todo
    localStorage.setItem('projects', JSON.stringify(projectList))
  }

  const removeTodo = function(todoId, projectId) {
    const projectList = JSON.parse(localStorage.getItem('projects'))
    delete projectList[projectId].todos[todoId]
    localStorage.setItem('projects', JSON.stringify(projectList))
  }

  return { setProperties, storeProject, updateCurrentProject, removeProject, storeTodo, removeTodo }
})()
