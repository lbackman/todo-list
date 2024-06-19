export default class ProjectList {
  #projects
  #currentId

  constructor() {
    this.#projects = {}
  }

  get currentProjectId() {
    return this.#currentId
  }

  set currentProjectId(id) {
    this.#currentId = id
  }

  get currentProject() {
    return this.#projects[this.#currentId]
  }

  get projects() {
    return this.#projects
  }

  addProject(project) {
    this.#projects[project.id] = project
    this.#currentId = project.id
  }

  removeProject(id) {
    delete this.#projects[id]
  }
}
