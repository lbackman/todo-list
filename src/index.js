import './reset.css'
import './style.css'
import ProjectList from './project_list'
import Project from './project'
import Todo from './todo'
import { userInterface } from './user_interface'

const projectList = new ProjectList()

// unless no projects exist, there should alway be a project selected by default
// if a selected project is deleted, another is automatically selected
// a new todo is attached to the selected project
// if no project exists, it should not be possible to create a todo
// alternatively, a default project that can not be deleted holds all non-project todos

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
  // make the Todo 'selected' as in the createProject function
}

const createObject = function(modal, button) {
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

const editObject = function(modal, button) {
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
      // editTodo(constructorArgs, projectList.currentProject.currentTodo)
      return true
    }
  }
  return false  
}

const openEditModal = function(modal) {
  ui.openModal(modal, 'Edit')
  ui.populateFields(modal, projectList.currentProject)
  ui.addModalEventListeners(modal, editObject, true)
}

const openNewModal = function(modal) {
  ui.openModal(modal, 'New')
  ui.addModalEventListeners(modal, createObject)
}

const deleteProject = function(projectNode) {
  const deletableProjectId = Number(projectNode.dataset.id)
  projectList.removeProject(deletableProjectId)
  ui.deleteProject(projectNode, deletableProjectId, projectList.projectId)
  // if current project == deleted project:
  // prompt user to select or create project
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
    // change to more generic deleteObject when including todos
    deleteProject(deletable)
  }
  if (event.target.classList.contains('selectable')) {
    const selectable = event.target.closest('.project')
    selectProject(selectable)
  }
  if (event.target.classList.contains('edit')) {
    const container = event.target.closest('.container')
    const modal = container.querySelector('.modal')
    openEditModal(modal)
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
