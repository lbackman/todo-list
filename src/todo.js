export default class Todo {
  #dateCreated
  #isOpen
  #id

  static id = 0

  static generateId() {
    return Todo.id++
  }

  constructor({ title, description, dueDate, priority }) {
    this.#assignFields({ title, description, dueDate, priority })
    this.#dateCreated = new Date()
    this.#id = Todo.generateId()
    this.#isOpen = true // open or closed
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
    // remove status from this getter, let it be a toggle button instead
    const values = { title: this.title,
                     description: this.description,
                     dueDate: this.dueDate,
                     priority: this.priority }
    return values
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
