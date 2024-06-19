export default (function storage() {
  const setProperties = function() {
    localStorage.setItem('projects', '{}')
    localStorage.setItem('currentMaxProjectId', '0')
    localStorage.setItem('currentMaxTodoId', '0')
    localStorage.setItem('currentProjectId', '0')
  }

  const modifyStorage = function(storageFunction, args) {
    const projects = JSON.parse(localStorage.getItem('projects'))
    storageFunction(projects, ...args)
    localStorage.setItem('projects', JSON.stringify(projects))
  }

  const projectStorer = (projects, project) => projects[project.id] = project
  const projectRemover = (projects, projectId) => delete projects[projectId]
  const todoStorer = (projects, project, todo) => projects[project.id].todos[todo.id] = todo
  const todoRemover = (projects, projectId, todoId) => delete projects[projectId].todos[todoId]

  const storeProject = function(project) {
    localStorage.setItem('currentMaxProjectId', JSON.stringify(project.id))
    modifyStorage(projectStorer, [project])
  }

  const removeProject = function(projectId) {
    modifyStorage(projectRemover, [projectId])
  }

  const storeTodo = function(project, todo) {
    localStorage.setItem('currentMaxTodoId', JSON.stringify(todo.id))
    modifyStorage(todoStorer, [project, todo])
  }

  const removeTodo = function(projectId, todoId) {
    modifyStorage(todoRemover, [projectId, todoId])
  }

  const updateCurrentProjectId = function(project) {
    localStorage.setItem('currentProjectId', JSON.stringify(project.id))
  }

  return { setProperties, storeProject, removeProject, storeTodo, removeTodo, updateCurrentProjectId }
})()
