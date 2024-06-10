import './reset.css'
import './style.css'
import ProjectList from './project_list'
import Project from './project'
import Todo from './todo'
import { userInterface } from './user_interface'

const projectList = new ProjectList()

const ui = userInterface()

const createProject = function(args) {
  const project = new Project(args)
  projectList.addProject(project)
  const projectContainer = document.querySelector('.project-container')
  ui.insertProject(projectContainer, project)
  const newProjectNode = projectContainer.querySelector(`[data-id='${project.id}']`)
  selectProject(newProjectNode)
}

const editProject = function(args, project) {
  project.edit(args)
  const projectContainer = document.querySelector('.project-container')
  ui.updateProject(projectContainer, project)
  const editedProjectNode = projectContainer.querySelector(`[data-id='${project.id}']`)
  selectProject(editedProjectNode)
}

const createTodo = function(args) {
  const todo = new Todo(args)
  projectList.currentProject.addTodo(todo)
  const todoContainer = document.querySelector('.todo-container')
  ui.insertTodo(todoContainer, todo)
}

const editTodo = function(args, todo) {
  todo.edit(args)
  const todoContainer = document.querySelector('.todo-container')
  ui.updateTodo(todoContainer, todo)
}

const createObject = function(modal, button, _id) {
  const inputFields = modal.querySelectorAll('.input')
  const constructorArgs = {}
  inputFields.forEach(inputField => {
    constructorArgs[inputField.name] = inputField.value
  })
  if (button.id === 'create-project') {
    if (constructorArgs['title'].trim()) {
      createProject(constructorArgs)
      return true
    }
  }
  else if (button.id === 'create-todo') {
    if (constructorArgs['title'].trim() && constructorArgs['priority'] && constructorArgs['dueDate']) {
      createTodo(constructorArgs)
      return true
    }
  }
  return false
}

const editObject = function(modal, button, id) {
  const inputFields = modal.querySelectorAll('.input')
  const constructorArgs = {}
  inputFields.forEach(inputField => {
    constructorArgs[inputField.name] = inputField.value
  })
  if (button.id === 'create-project') {
    if (constructorArgs['title'].trim()) {
      editProject(constructorArgs, projectList.currentProject)
      return true
    }
  }
  else if (button.id === 'create-todo') {
    if (constructorArgs['title'].trim() && constructorArgs['priority'] && constructorArgs['dueDate']) {
      editTodo(constructorArgs, projectList.currentProject.todos[id])
      return true
    }
  }
  return false  
}

const openEditModal = function(modal, id) {
  ui.openModal(modal, 'Edit')
  ui.populateFields(modal, projectList.currentProject, id)
  ui.addModalEventListeners(editObject, modal, id, true)
}

const openNewModal = function(modal) {
  ui.openModal(modal, 'New')
  ui.addModalEventListeners(createObject, modal)
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
  ui.deleteObject(projectNode, deletableProjectId, projectList.projectId)
}

const deleteTodo = function(todoNode) {
  const deletableTodoId = Number(todoNode.dataset.id)
  projectList.currentProject.removeTodo(deletableTodoId)
  ui.deleteObject(todoNode)
}

const selectProject = function(projectNode) {
  if (!projectNode.classList.contains('selected')) {
    projectList.projectId = Number(projectNode.dataset.id)
    const project = projectList.currentProject
    ui.selectProject(projectNode, project)
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
    const selectable = event.target.closest('.project')
    selectProject(selectable)
  }
  if (event.target.classList.contains('edit')) {
    const container = event.target.closest('.container')
    const modal = container.querySelector('.modal')
    const id = Number(event.target.closest('.editable').dataset.id)
    openEditModal(modal, id)
  }
})

createProject(
  {
    'title': 'Default project',
    'description': 'Add todos here'
  }
)

createProject(
  {
    'title': 'Second project',
    'description': 'Add todos here'
  }
)
