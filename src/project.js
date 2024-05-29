export default class Project {
  #todos
  #id

  static id = 0

  static calculateId() {
    return Project.id++
  }

  constructor({ title, description }) {
    this.#assignFields({ title, description })
    this.#todos = []
    this.#id = Project.calculateId()
  }

  get id() {
    return this.#id
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

  edit({ title, description }) {
    this.#assignFields({ title, description })
  }

  get editableValues() {
    const values = { 'title': this.title, 'description': this.description }
    return values
  }

  #assignFields({ title, description }) {
    this.title = title
    this.description = description
  }
}
