export default class Project {
  #todos
  #id

  static id = 0

  static generateId() {
    return Project.id++
  }

  constructor({ title, description, id = Project.generateId() }) {
    this.#assignFields({ title, description })
    this.#todos = {}
    this.#id = id
  }

  get id() {
    return this.#id
  }

  get projectTodos() {
    return this.#todos
  }

  todosArray(hideClosed) {
    const array = Object.values(this.#todos)
    if (hideClosed) {
      return array.filter((todo) => todo.isOpen === true)
    } else {
      return array
    }
  }

  get todos() {
    return this.#todos
  }

  addTodo(todo) {
    this.#todos[todo.id] = todo
  }

  removeTodo(id) {
    delete this.#todos[id]
  }

  edit(fieldValues) {
    this.#assignFields(fieldValues)
  }

  get editableValues() {
    return { title: this.title, description: this.description }
  }

  #assignFields(fieldValues) {
    for (const property in fieldValues) {
      this[property] = fieldValues[property]
    }
  }

  toJSON() {
    const project = this.editableValues
    project.id = this.id
    project.todos = this.todos
    return project
  }
}
