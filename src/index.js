import './style.css'
import Project from './project'
import Todo from './todo'

const defaultProject = new Project(
  {
    'title': 'Default project',
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

defaultProject.addTodo(td)
console.log(defaultProject.projectTodos)
defaultProject.removeTodo(td)
console.log(defaultProject.projectTodos)

const projectModalBtn = document.getElementById("new-project")
const todoModalBtn = document.getElementById("new-todo")

const openModal = function(modal) {
  modal.style.display = "block"
}

const closeModal = function(modal) {
  modal.style.display = "none"
}

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

const buttons = [projectModalBtn, todoModalBtn]

buttons.forEach(button => {
  button.onclick = function() {
    const modal = button.nextElementSibling
    openModal(modal)

    const submitButton = modal.querySelector('input[type="submit"]')
    submitButton.onclick = function(event) {
      event.preventDefault();
      // have the same class of 'input' on all input fields
      const inputFields = modal.querySelectorAll('.input')
      const constructorArgs = {}
      // use name property of inputs to create the key-words: {'title': 'some title', 'description': 'blabla'}
      inputFields.forEach(inputField => {
        constructorArgs[inputField.name] = inputField.value
      })
      if (submitButton.id === 'create-project') {
        if (constructorArgs['title'].trim()) {
          createProject(constructorArgs)
          closeModal(modal)
        }
      }
      else if (submitButton.id === 'create-todo') {
        if (constructorArgs['title'].trim() && constructorArgs['priority'] && constructorArgs['dueDate']) {
          createTodo(constructorArgs)
          closeModal(modal)
        }
      }
    }

    const closeSpan = modal.querySelector('.close')
    window.onclick = function(event) {
      if (event.target == modal || event.target == closeSpan) {
        closeModal(modal)
      }
    }
  }
})
