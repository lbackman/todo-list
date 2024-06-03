export default class Todo {
  #dateCreated
  #status
  #id

  static id = 0

  static generateId() {
    return Todo.id++
  }

  // include id in todo instances like in project

  constructor({ title, description, dueDate, priority }) {
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
    this.#dateCreated = new Date()
    this.#id = Todo.generateId()
    this.#status = 'open' // open or closed
  }

  get creationDate() {
    return this.#dateCreated
  }

  get currentStatus() {
    return this.#status
  }

  get id() {
    return this.#id
  }

  set currentStatus(newStatus) {
    this.#status = newStatus
  }

  get editableValues() {
    const values = { title: this.title,
                     description: this.description,
                     dueDate: this.dueDate,
                     priority: this.priority,
                     status: this.#status }
    return values
  }
}
