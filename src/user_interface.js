import { projectTemplate } from './project_template'

export function userInterface() {
  const openModal = function(modal, headerContent) {
    const header = modal.querySelector('.header .object-type')
    header.textContent = headerContent
    modal.style.display = "block"
  }

  const closeModal = function(modal, resetFields = true) {
    if (resetFields) {
      modal.querySelector('form').reset()
      console.log('reset')
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
