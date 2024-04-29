import './style.css'
import Project from './project'
import Item from './todo'

const defaultProject = new Project(
  {
    title: 'Default project',
    description: 'Add todos here'
  }
)

const td = new Item(
  {
    title: 'first',
    description: 'first todo',
    dueDate: 'tomorrow',
    priority: 'high priority'
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

const buttons = [projectModalBtn, todoModalBtn]
buttons.forEach(button => {
  button.onclick = function() {
    const modal = button.nextElementSibling
    modal.style.display = 'block'
    const closeSpan = modal.querySelector('.close')
    window.onclick = function(event) {
      if (event.target == modal || event.target == closeSpan) {
        closeModal(modal)
      }
    }
  }
})
