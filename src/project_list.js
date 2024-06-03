export default class ProjectList {
  #projects
  #currentProjectId

  constructor() {
    this.#projects = {}
  }

  get projectId() {
    return this.#currentProjectId
  }

  set projectId(id) {
    this.#currentProjectId = id
  }

  get currentProject() {
    return this.#projects[this.#currentProjectId]
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
