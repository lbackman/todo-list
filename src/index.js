import './style.css'
import Project from './project'
import Item from './todo'

const defaultProject = new Project(
  {
    'title': 'Default project',
    'description': 'Add todos here'
  }
)

const td = new Item(
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

const closeModal = function(modal) {
  modal.style.display = "none"
}

const createProject = function(args) {
  console.log(args)
}

const createTodo = function(args) {
  console.log(args)
}

const buttons = [projectModalBtn, todoModalBtn]

buttons.forEach(button => {
  button.onclick = function() {
    const modal = button.nextElementSibling
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
        createProject(constructorArgs)
      } else if (submitButton.id === 'create-todo') {
        createTodo(constructorArgs)
      }
    }
    modal.style.display = 'block'
    const closeSpan = modal.querySelector('.close')
    window.onclick = function(event) {
      if (event.target == modal || event.target == closeSpan) {
        closeModal(modal)
      }
    }
  }
})
