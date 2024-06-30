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
    // maybe return it with the todos ordered by due date
    // https://www.freecodecamp.org/news/how-to-sort-array-of-objects-by-property-name-in-javascript/
    // in that case it would be good to handle insertion so that the date order is preserved
    // also if editing the date it would have to be inserted again
    // https://stackoverflow.com/questions/282670/easiest-way-to-sort-dom-nodes
    // https://stackoverflow.com/questions/68184606/how-do-i-sort-html-collections-based-on-child-elements-using-plain-javascript
    // and in css add an animation so that it's clear where the newly added todo is inserted
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
