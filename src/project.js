export default class Project {
  #todos
  constructor({ title, description }) {
    this.title = title
    this.description = description
    this.#todos = []
  }

  get projectTodos() {
    return this.#todos
  }

  addTodo(todo) {
    this.#todos.push(todo)
  }

  removeTodo(todo) {
    const index = this.#todos.indexOf(todo)
    this.#todos.splice(index, 1)
  }
}
