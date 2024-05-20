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
    const projectNode = projectTemplate(project)
    container.appendChild(projectNode)
  }

  const selectProject = function(projectNode) {
    const previouslySelected = projectNode.parentNode.querySelector('.selected')
    if (previouslySelected) {
      previouslySelected.classList.remove('selected')
    }
    projectNode.classList.add('selected')
  }

  return { openModal, closeModal, insertProject, selectProject }
}
