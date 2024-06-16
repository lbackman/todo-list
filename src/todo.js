export default class Todo {
  #dateCreated
  #isOpen
  #id

  static id = 0

  static generateId() {
    return Todo.id++
  }

  constructor({ title, description, dueDate, priority, dateCreated, id = Todo.generateId(), isOpen = true }) {
    this.#assignFields({ title, description, dueDate, priority })
    this.#dateCreated = dateCreated ? new Date(dateCreated) : new Date()
    this.#id = id
    this.#isOpen = isOpen
  }

  get creationDate() {
    return this.#dateCreated
  }

  get isOpen() {
    return this.#isOpen
  }

  get id() {
    return this.#id
  }

  get editableValues() {
    return {
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      priority: this.priority
    }
  }

  toggleStatus() {
    this.#isOpen = !this.#isOpen
  }

  edit(fieldValues) {
    this.#assignFields(fieldValues)
  }

  #assignFields(fieldValues) {
    for (const property in fieldValues) {
      this[property] = fieldValues[property]
    }
  }
}
