import { projectTemplate } from './project_template'
import { todoTemplate } from './todo_template'

export default (function userInterface() {
  const openModal = function(modal, headerContent) {
    const header = modal.querySelector('.header .object-type')
    header.textContent = headerContent
    modal.style.display = "block"
  }

  const closeModal = function(modal, resetFields = true) {
    const validationDiv = modal.querySelector('.validation')
    clearContainer(validationDiv)
    if (resetFields) {
      modal.querySelector('form').reset()
      console.log('reset')
    }
    modal.style.display = "none"
  }

  const insertProject = function(project) {
    const projectContainer = document.querySelector('.project-container')
    insert(projectTemplate, projectContainer, project)
  }

  const insertTodo = function(todo) {
    const todoContainer = document.querySelector('.todo-container')
    insert(todoTemplate, todoContainer, todo)
  }

  const insert = function(template, container, object) {
    const node = template(object)
    container.appendChild(node)
  }

  const updateProject = function(container, project) {
    update(projectTemplate, container, project)
  }

  const updateTodo = function(container, todo) {
    update(todoTemplate, container, todo)
  }

  const update = function(template, container, object) {
    const replacableNode = container.querySelector(`[data-id='${object.id}']`)
    const updatedNode = template(object)
    replacableNode.replaceWith(updatedNode)
  }

  const selectProject = function(project) {
    const projectContainer = document.querySelector('.project-container')
    const projectNode = projectContainer.querySelector(`[data-id='${project.id}']`)
    if (!projectNode.classList.contains('selected')) {
      const previouslySelected = projectNode.parentNode.querySelector('.selected')
      if (previouslySelected) {
        previouslySelected.classList.remove('selected')
      }
      projectNode.classList.add('selected')
      const todoContainer = document.querySelector('.todo-container')
      clearContainer(todoContainer)
      fillContainer(todoContainer, project.todosArray)
    }
  }

  const deleteObject = function(node, projectId = null, currentProjectId = null) {
    node.remove()
    if (projectId !== null && projectId === currentProjectId) {
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

  const toggleStatus = function(todoNode, todoIsOpen) {
    const currentStatus = todoNode.querySelector('.current-status > span')
    if (todoIsOpen) {
      todoNode.classList.remove('closed')
      currentStatus.textContent = 'Open'
    } else {
      todoNode.classList.add('closed')
      currentStatus.textContent = 'Closed'
    }
  }

  const showVerificationMessage = function(modal, fields) {
    const validationDiv = modal.querySelector('.validation')
    clearContainer(validationDiv)
    const messageList = document.createElement('ul')
    messageList.classList.add('messages')
    fields.forEach(field => {
      const listItem = document.createElement('li')
      listItem.textContent = `Please fill in ${field}.`
      messageList.appendChild(listItem)
    })
    validationDiv.appendChild(messageList)
  }

  return { openModal, insertProject, insertTodo, updateProject, updateTodo, selectProject, deleteObject, populateFields, addModalEventListeners, toggleStatus, showVerificationMessage }
})()
