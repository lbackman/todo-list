export default class ProjectList {
  #projects
  #currentId

  constructor() {
    this.#projects = {}
  }

  get projectId() {
    return this.#currentId
  }

  set projectId(id) {
    this.#currentId = id
  }

  get currentProject() {
    return this.#projects[this.#currentId]
  }

  addProject(project) {
    this.#projects[project.id] = project
    // this line may be separated out in future
    this.projectId = project.id
  }

  removeProject(id) {
    delete this.#projects[id]
    // if the current project is removed, an adjacent project is chosen in the UI
  }
}
