export default class Project {
  #todos
  #id
  #currentTodoId

  static id = 0

  static generateId() {
    return Project.id++
  }

  constructor({ title, description }) {
    this.#assignFields({ title, description })
    this.#todos = {}
    this.#id = Project.generateId()
  }

  get id() {
    return this.#id
  }

  get projectTodos() {
    return this.#todos
  }

  get todoId() {
    return this.#currentTodoId
  }

  set todoId(id) {
    this.#currentTodoId = id
  }

  get currentTodo() {
    return this.#todos[this.#currentTodoId]
  }

  addTodo(todo) {
    this.#todos[todo.id] = todo
    this.todoId = todo.id
  }

  removeTodo(id) {
    delete this.#todos[id]
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
