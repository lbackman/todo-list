export function todoTemplate(todo, justCreated = false) {
  const todoItem = document.createElement('li')
  todoItem.classList.add('todo', 'deletable', 'editable')
  if (justCreated) {
    todoItem.classList.add('just-created')
  }
  if (!todo.isOpen) {
    todoItem.classList.add('closed')
  }
  todoItem.dataset.id = todo.id
  todoItem.tabIndex = '0'
  const checkbox = `<input type="checkbox" name="complete" class="check" ${todo.isOpen ? '' : 'checked'}>`
  const contents = `<div class="information">
                      <h2 class="title">${todo.title}</h2>
                      <p class="description">${todo.description}</p>
                      <p class="due-date">Due date: ${todo.dueDate}</p>
                      <p class="priority">Priority: ${todo.priority}</p>
                      <p class="current-status">Status: <span>${todo.isOpen ? 'Open' : 'Closed'}</span></p>
                      <button class="delete">Delete</button>
                      <button class="edit">Edit</button>
                    </div>`
  
  todoItem.insertAdjacentHTML('afterbegin', contents)
  todoItem.insertAdjacentHTML('afterbegin', checkbox)

  return todoItem
}
