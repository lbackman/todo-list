import './reset.css'
import './style.css'
import ProjectList from './project_list'
import Project from './project'
import Todo from './todo'
import { userInterface } from './user_interface'

const projectList = new ProjectList()

const defaultProject = new Project(
  {
    'title': 'Default project',
    'description': 'Add todos here'
  }
)

const secondProject = new Project(
  {
    'title': 'Second project',
    'description': 'Add todos here'
  }
)

const td = new Todo(
  {
    'title': 'first',
    'description': 'first todo',
    'dueDate': 'tomorrow',
    'priority': 'high priority'
  }
)

// next steps: create an object (array) for holding all projects
// unless no projects exist, there should alway be a project selected by default
// if a selected project is deleted, another is automatically selected
// a new todo is attached to the selected project
// if no project exists, it should not be possible to create a todo
// alternatively, a default project that can not be deleted holds all non-project todos

projectList.addProject(defaultProject)
projectList.addProject(secondProject)
defaultProject.addTodo(td)
console.log(projectList.currentProject)
console.log(defaultProject.projectTodos)
defaultProject.removeTodo(td)
console.log(defaultProject.projectTodos)

const ui = userInterface()
const projectModalBtn = document.getElementById("new-project")
const todoModalBtn = document.getElementById("new-todo")

const createProject = function(args) {
  const project = new Project(args)
  console.log(project)
  // add project to array of all projects
  // insert into DOM
}

const createTodo = function(args) {
  const todo = new Todo(args)
  console.log(todo)
  // add todo to the current project
  // insert into DOM
}

const modalButtons = [projectModalBtn, todoModalBtn]

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

modalButtons.forEach(modalButton => {
  modalButton.addEventListener('click', function() {
    const modal = modalButton.nextElementSibling
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
  })
})
