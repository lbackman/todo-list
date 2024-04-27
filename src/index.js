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
