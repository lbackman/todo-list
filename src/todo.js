export default class Todo {
  #dateCreated
  #status

  constructor({ title, description, dueDate, priority }) {
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
    this.#dateCreated = new Date()
    this.#status = 'open' // there should be a predefined list of statuses, e.g. open, in progress, closed etc.
  }

  get creationDate() {
    return this.#dateCreated
  }

  get currentStatus() {
    return this.#status
  }

  set currentStatus(newStatus) {
    this.#status = newStatus
  }
}
