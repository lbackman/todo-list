import './reset.css'
import './style.css'
import ProjectList from './project_list'
import Project from './project'
import Todo from './todo'
import userInterface from './user_interface'
import storage from './storage'

const projectList = new ProjectList()

const createProject = function(args) {
  const project = new Project(args)
  projectList.addProject(project)
  userInterface.insertProject(project)
  if (args.id === undefined) {
    // if we select when creating from storage, the saved currentProjectId will be overwritten
    selectProject(project)
    storage.storeProject(project, args.id)
  }
  return project
}

const editProject = function(args, project) {
  project.edit(args)
  const projectContainer = document.querySelector('.project-container')
  userInterface.updateProject(projectContainer, project)
  storage.storeProject(project, args.id)
  selectProject(project)
}

const createTodo = function(args, project) {
  const todo = new Todo(args)
  project.addTodo(todo)
  // unnecessary to insert todo or store again if it's created from storage
  if (args.id === undefined) {
    userInterface.insertTodo(todo)
    storage.storeTodo(project, todo)
  }
}

const editTodo = function(args, todo, project) {
  todo.edit(args)
  const todoContainer = document.querySelector('.todo-container')
  userInterface.updateTodo(todoContainer, todo)
  storage.storeTodo(project, todo, args.id)
}

const createOrEditObject = function(modal, button, id) {
  const requiredFields = modal.querySelectorAll('[required]')
  if (!verifyRequiredFields(modal, [...requiredFields])) {
    return false
  }

  const inputFields = modal.querySelectorAll('.input')
  const constructorArgs = {}
  inputFields.forEach(inputField => {
    constructorArgs[inputField.name] = inputField.value
  })
  if (button.id === 'create-project') {
    if (id !== null) {
      editProject(constructorArgs, projectList.currentProject)
    } else {
      createProject(constructorArgs)
    }
  }
  else if (button.id === 'create-todo') {
    if (id !== null) {
      editTodo(constructorArgs, projectList.currentProject.todos[id], projectList.currentProject)
    } else {
      createTodo(constructorArgs, projectList.currentProject)
    }
  }
  return true
}

const verifyRequiredFields = function(modal, requiredFields) {
  const emptyFields = requiredFields.filter(field => field.value.trim() === '').map(field => field.dataset.name)
  if (emptyFields[0]) {
    userInterface.showVerificationMessage(modal, emptyFields)
    return false
  }
  return true
}

const openEditModal = function(modal, id) {
  userInterface.openModal(modal, 'Edit')
  userInterface.populateFields(modal, projectList.currentProject, id)
  userInterface.addModalEventListeners(createOrEditObject, modal, id, true)
}

const openNewModal = function(modal) {
  userInterface.openModal(modal, 'New')
  userInterface.addModalEventListeners(createOrEditObject, modal)
}

const deleteObject = function(node) {
  if (node.classList.contains('project')) {
    deleteProject(node)
  }
  else if (node.classList.contains('todo')) {
    deleteTodo(node)
  }
}

const deleteProject = function(projectNode) {
  const deletableProjectId = Number(projectNode.dataset.id)
  projectList.removeProject(deletableProjectId)
  userInterface.deleteObject(projectNode, deletableProjectId, projectList.currentProjectId)
  storage.removeProject(deletableProjectId)
}

const deleteTodo = function(todoNode) {
  const deletableTodoId = Number(todoNode.dataset.id)
  projectList.currentProject.removeTodo(deletableTodoId)
  userInterface.deleteObject(todoNode)
  storage.removeTodo(projectList.currentProjectId, deletableTodoId)
}

const selectProject = function(project) {
  if (project) {
    projectList.currentProjectId = project.id
    userInterface.selectProject(project)
    storage.updateCurrentProjectId(project)
  }
}

const handleModalButtonClick = function(target) {
  const modal = target.nextElementSibling
  if (target.id === 'new-todo') {
    const projects = document.querySelector('.project-container').childNodes
    if (![...projects].some(project => project.classList.contains('selected'))) {
      console.log('choose a project first!')
      return
    }
  }
  openNewModal(modal)
}

const toggleStatus = function(todoNode) {
  const id = Number(todoNode.dataset.id)
  const todo = projectList.currentProject.todos[id]
  todo.toggleStatus()
  userInterface.toggleStatus(todoNode, todo.isOpen)
  storage.storeTodo(projectList.currentProject, todo)
}

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('modal-button')) {
    const modalTarget = event.target
    handleModalButtonClick(modalTarget)
  }
  if (event.target.classList.contains('delete')) {
    const deletable = event.target.closest('.deletable')
    deleteObject(deletable)
  }
  if (event.target.classList.contains('selectable')) {
    const id = Number(event.target.closest('.project').dataset.id)
    selectProject(projectList.projects[id])
  }
  if (event.target.classList.contains('edit')) {
    const container = event.target.closest('.container')
    const modal = container.querySelector('.modal')
    const id = Number(event.target.closest('.editable').dataset.id)
    openEditModal(modal, id)
  }
  if (event.target.classList.contains('check')) {
    const todo = event.target.closest('.todo')
    toggleStatus(todo)
  }
})

// createProject(
//   {
//     'title': 'Default project',
//     'description': 'Add todos here'
//   }
// )

// createProject(
//   {
//     'title': 'Second project',
//     'description': 'Add todos here'
//   }
// )

if (localStorage.getItem('projects')) {
  // populate the page with the stored projects and todos
  const storedProjects = JSON.parse(localStorage.getItem('projects'))
  Object.values(storedProjects).forEach(project => {
    const restoredProject = createProject(project)
    Object.values(project.todos).forEach(todo => {
      createTodo(todo, restoredProject)
    })
  })
  // set the current max ids for projects and todos
  Project.id = Number(localStorage.getItem('currentMaxProjectId')) + 1
  Todo.id = Number(localStorage.getItem('currentMaxTodoId')) + 1
  // select the project with the currentProjectId
  selectProject(projectList.projects[Number(localStorage.getItem('currentProjectId'))])
} else {
  storage.setProperties()
}
