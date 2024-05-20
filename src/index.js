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
    }
  }
  else if (button.id === 'create-todo') {
    if (constructorArgs['title'].trim() && constructorArgs['priority'] && constructorArgs['dueDate']) {
      createTodo(constructorArgs)
      ui.closeModal(modal)
    }
  }
}

const modalEvent = function(modal) {
  ui.openModal(modal)

  const submitButton = modal.querySelector('input[type="submit"]')
  submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    createObject(modal, submitButton)
  })

  const closeSpan = modal.querySelector('.close')
  window.addEventListener('click', function(event) {
    if (event.target == modal || event.target == closeSpan) {
      ui.closeModal(modal, false)
    }
  })
}

const deleteProject = function(projectNode) {
  const objectId = Number(projectNode.dataset.id)
  projectList.removeProject(objectId)
  projectNode.remove()
  // if current project == deleted project, select another
}

const selectProject = function(projectNode) {
  if (!projectNode.classList.contains('selected')) {
    projectList.projectId = Number(projectNode.dataset.id)
    const previouslySelected = projectNode.parentNode.querySelector('.selected')
    if (previouslySelected) {
      previouslySelected.classList.remove('selected')
    }
    projectNode.classList.add('selected')
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
    // All child elements except the buttons should also select the project node
    selectProject(selectable)
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
