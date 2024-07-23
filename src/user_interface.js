import { projectTemplate } from './project_template'
import { todoTemplate } from './todo_template'

export default (function userInterface() {
  const openModal = function(modal, headerContent) {
    const header = modal.querySelector('.header .object-type')
    header.textContent = headerContent
    modal.classList.add('visible')
    modal.querySelector('[name="title"]').focus()
  }

  const closeModal = function(modal, resetFields = true) {
    const validationDiv = modal.querySelector('.validation')
    clearContainer(validationDiv)
    if (resetFields) {
      modal.querySelector('form').reset()
    }
    modal.classList.remove('visible')
  }

  const insertProject = function(project, justCreated) {
    const projectContainer = document.querySelector('.project-container')
    insert(projectTemplate, projectContainer, project, justCreated)
  }

  const insertTodo = function(todo, justCreated) {
    const todoContainer = document.querySelector('.todo-container')
    insert(todoTemplate, todoContainer, todo, justCreated)
  }

  const insert = function(template, container, object, justCreated) {
    const node = template(object, justCreated)
    container.appendChild(node)
    if (justCreated) {
      scrollToInserted(object, container)
      node.onanimationend = function() {
        node.classList.remove('just-created')
      }
    }
  }

  const scrollToInserted = function(object, container) {
    const insertedNode = container.querySelector(`[data-id='${object.id}']`)
    insertedNode.scrollIntoView()
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
    updatedNode.classList.add('just-edited')
    replacableNode.replaceWith(updatedNode)
    updatedNode.onanimationend = function() {
      updatedNode.classList.remove('just-edited')
    }
  }

  const selectProject = function(project, hideClosed) {
    const projectContainer = document.querySelector('.project-container')
    const projectNode = projectContainer.querySelector(`[data-id='${project.id}']`)
    if (!projectNode.classList.contains('selected')) {
      const previouslySelected = projectNode.parentNode.querySelector('.selected')
      if (previouslySelected) {
        previouslySelected.classList.remove('selected')
      }
      projectNode.classList.add('selected')
      loadProject(project, hideClosed)
    }
  }

  const loadProject = function(project, hideClosed) {
    const todoContainer = document.querySelector('.todo-container')
    clearContainer(todoContainer)
    const todosArray = project.todosArray(hideClosed)
    fillContainer(todoContainer, todosArray)
  }

  const deleteObject = function(node, projectId = null, currentProjectId = null) {
    node.animate(
      [
        {
          // from
          opacity: 1
        },
        {
          // to
          opacity: 0,
          backgroundColor: "#ccc",
          marginBottom: `-${node.clientHeight}px`,
          transform: "scale(0)",
          transformOrigin: "top right"
        },
      ],
      520,
    )
    setTimeout(() => {
      node.remove()
    }, 500)
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

  return { openModal, insertProject, insertTodo, updateProject, updateTodo, selectProject, loadProject, deleteObject, populateFields, addModalEventListeners, toggleStatus, showVerificationMessage }
})()
