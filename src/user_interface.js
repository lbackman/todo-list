import { projectTemplate } from './project_template'

export function userInterface() {
  const openModal = function(modal) {
    modal.style.display = "block"
  }

  const closeModal = function(modal, objectCreated = true) {
    if (objectCreated) {
      modal.querySelector('form').reset()
    }
    modal.style.display = "none"
  }

  const insertProject = function(container, project) {
    const projectHTML = projectTemplate(project)
    container.appendChild(projectHTML)
  }

  return { openModal, closeModal, insertProject }
}
