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

const createTodo = function(args) {
  const todo = new Todo(args)
  console.log(todo)
  // add todo to the current project
  // insert into DOM
}

const createObject = function(modal, button) {
  // have the same class of 'input' on all input fields
  const inputFields = modal.querySelectorAll('.input')
  const constructorArgs = {}
  // use name property of inputs to create the key-words: {'title': 'some title', 'description': 'blabla'}
  inputFields.forEach(inputField => {
    constructorArgs[inputField.name] = inputField.value
  })
  if (button.id === 'create-project') {
    if (constructorArgs['title'].trim()) {
      createProject(constructorArgs)
      ui.closeModal(modal)
      return true
    }
  }
  else if (button.id === 'create-todo') {
    if (constructorArgs['title'].trim() && constructorArgs['priority'] && constructorArgs['dueDate']) {
      createTodo(constructorArgs)
      ui.closeModal(modal)
      return true
    }
  }
  return false
}

const modalEvent = function(modal, editable = false) {
  if (editable) {
    ui.openModal(modal, 'Edit')
    const editableProject = projectList.currentProject
    const titleField = modal.querySelector('input[name="title"]')
    titleField.value = editableProject.title
    const descriptionField = modal.querySelector('textarea[name="description"]')
    descriptionField.value = editableProject.description
    // event listener on submit button
    // modify createObject to allow for editing
  } else {
    ui.openModal(modal, 'New')
    const submitNewProjectButton = modal.querySelector('input[type="submit"]')
    const submitButtonListner = function(event) {
      event.preventDefault()
      if (createObject(modal, submitNewProjectButton)) {
        submitNewProjectButton.removeEventListener('click', submitButtonListner)
      }
    }
    submitNewProjectButton.addEventListener('click', submitButtonListner)
  }

  const closeSpan = modal.querySelector('.close')

  const closeModalListner = function(event) {
    if (event.target == modal || event.target == closeSpan) {
      ui.closeModal(modal, editable)
      window.removeEventListener('click', closeModalListner)
    }
  }
  window.addEventListener('click', closeModalListner)
}

const deleteProject = function(projectNode) {
  const objectId = Number(projectNode.dataset.id)
  projectList.removeProject(objectId)
  projectNode.remove()
  // if current project == deleted project, prompt user to select or create project
}

const selectProject = function(projectNode) {
  if (!projectNode.classList.contains('selected')) {
    projectList.projectId = Number(projectNode.dataset.id)
    ui.selectProject(projectNode)
    // remove the previous project's todos from todo container
    // populate it with the new project's todos
  }
}

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('modal-button')) {
    const modal = event.target.nextElementSibling
    modalEvent(modal)
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
    modalEvent(modal, true)
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
