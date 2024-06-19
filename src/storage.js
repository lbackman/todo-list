export default (function storage() {
  const setProperties = function() {
    localStorage.setItem('projects', '{}')
    localStorage.setItem('currentMaxProjectId', '0')
    localStorage.setItem('currentMaxTodoId', '0')
    localStorage.setItem('currentProjectId', '0')
  }

  const modifyStorage = function(storageFunction, args) {
    const projectList = JSON.parse(localStorage.getItem('projects'))
    storageFunction(projectList, ...args)
    localStorage.setItem('projects', JSON.stringify(projectList))
  }

  const projectStorer = (list, project) => list[project.id] = project
  const projectRemover = (list, projectId) => delete list[projectId]
  const todoRemover = (list, projectId, todoId) => delete list[projectId].todos[todoId]
  const todoStorer = (list, project, todo) => list[project.id].todos[todo.id] = todo

  const storeProject = function(project) {
    localStorage.setItem('currentMaxProjectId', JSON.stringify(project.id))
    modifyStorage(projectStorer, [project])
  }

  const updateCurrentProject = function(project) {
    localStorage.setItem('currentProjectId', JSON.stringify(project.id))
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

  return { setProperties, storeProject, updateCurrentProject, removeProject, storeTodo, removeTodo }
})()
