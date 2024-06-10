import { projectTemplate } from './project_template'
import { todoTemplate } from './todo_template'

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

  const insertTodo = function(container, todo) {
    const todoNode = todoTemplate(todo)
    container.appendChild(todoNode)
  }

  const updateProject = function(container, project) {
    const replacableProjectNode = container.querySelector(`[data-id='${project.id}']`)
    const updatedProjectNode = projectTemplate(project)
    replacableProjectNode.replaceWith(updatedProjectNode)
  }

  const updateTodo = function(container, todo) {
    const replacableTodoNode = container.querySelector(`[data-id='${todo.id}']`)
    const updatedTodoNode = todoTemplate(todo)
    replacableTodoNode.replaceWith(updatedTodoNode)
  }

  const selectProject = function(projectNode, project) {
    const previouslySelected = projectNode.parentNode.querySelector('.selected')
    if (previouslySelected) {
      previouslySelected.classList.remove('selected')
    }
    projectNode.classList.add('selected')
    const todoContainer = document.querySelector('.todo-container')
    clearContainer(todoContainer)
    fillContainer(todoContainer, project.todosArray)
  }

  const deleteObject = function(node, projectId = null, currentProjectId = null) {
    node.remove()
    if (projectId && projectId === currentProjectId) {
      const todoContainer = document.querySelector('.todo-container')
      clearContainer(todoContainer)
    }
  }

  const clearContainer = function(container) {
    while (container.firstChild) {
      container.removeChild(container.lastChild)
    }
  }

  const fillContainer = function(container, todos) {
    todos.forEach(todo => container.appendChild(todoTemplate(todo)))
  }

  const populateFields = function(modal, project, id) {
    let fieldValues
    if (modal.id === 'projectModal') {
      fieldValues = project.editableValues
    }
    else if (modal.id === 'todoModal') {
      const todo = project.todos[id]
      fieldValues = todo.editableValues
    }
    const fields = modal.querySelectorAll('.input')
    fields.forEach(field => field.value = fieldValues[field.name])
  }

  const addModalEventListeners = function(submitFunction, modal, id = null, editable = false) {
    const submitButton = modal.querySelector('input[type="submit"]')
    const submitButtonListner = function(event) {
      event.preventDefault()
      if (submitFunction(modal, submitButton, id)) {
        window.removeEventListener('click', closeModalListner)
        submitButton.removeEventListener('click', submitButtonListner)
        closeModal(modal)
      }
    }
    const closeSpan = modal.querySelector('.close')
    const closeModalListner = function(event) {
      if (event.target == modal || event.target == closeSpan) {
        window.removeEventListener('click', closeModalListner)
        submitButton.removeEventListener('click', submitButtonListner)
        closeModal(modal, editable)
      }
    }
    window.addEventListener('click', closeModalListner)
    submitButton.addEventListener('click', submitButtonListner)
  }

  return { openModal, insertProject, updateProject, updateTodo, selectProject, deleteObject, populateFields, insertTodo, addModalEventListeners }
}
