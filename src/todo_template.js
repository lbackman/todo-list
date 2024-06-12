export function todoTemplate(todo) {
  const todoDiv = document.createElement('div')
  todoDiv.classList.add('todo', 'deletable', 'editable')
  if (!todo.isOpen) {
    todoDiv.classList.add('closed')
  }
  todoDiv.dataset.id = todo.id
  todoDiv.tabIndex = '0'
  const checkbox = `<input type="checkbox" class="check" ${todo.isOpen ? '' : 'checked'}>`
  const contents = `<div>
                      <h2 class="title">${todo.title}</h2>
                      <p class="description">${todo.description}</p>
                      <p class="due-date">Due date: ${todo.dueDate}</p>
                      <p class="priority">Priority: ${todo.priority}</p>
                      <p class="current-status">Status: ${todo.currentStatus}</p>
                      <button class="delete">Delete</button>
                      <button class="edit">Edit</button>
                    </div>`
  
  todoDiv.insertAdjacentHTML('afterbegin', contents)
  todoDiv.insertAdjacentHTML('afterbegin', checkbox)

  return todoDiv
}
