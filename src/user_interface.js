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

  const updateProject = function(container, project) {
    const replacableProjectNode = container.querySelector(`[data-id='${project.id}']`)
    const updatedProjectNode = projectTemplate(project)
    replacableProjectNode.replaceWith(updatedProjectNode)
  }

  const selectProject = function(projectNode) {
    const previouslySelected = projectNode.parentNode.querySelector('.selected')
    if (previouslySelected) {
      previouslySelected.classList.remove('selected')
    }
    projectNode.classList.add('selected')
  }

  const populateFields = function(modal, project) {
    if (modal.id === 'projectModal') {
      const fieldValues = project.editableValues
      const fields = modal.querySelectorAll('.input')
      fields.forEach(field => field.value = fieldValues[field.name])
    }
    else if (modal.id === 'todoModal') {
      console.log('todo')
    }
  }

  return { openModal, closeModal, insertProject, updateProject, selectProject, populateFields }
}
