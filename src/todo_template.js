export function todoTemplate(todo) {
  const todoDiv = document.createElement('div')
  todoDiv.classList.add('todo', 'deletable', 'editable')
  todoDiv.dataset.id = todo.id
  todoDiv.tabIndex = '0'

  const contents = `<h2 class="title">${todo.title}</h2>
                    <p class="description">${todo.description}</p>
                    <p class="due-date">Due date: ${todo.dueDate}</p>
                    <p class="priority">Priority: ${todo.priority}</p>
                    <p class="current-status">Status: ${todo.currentStatus}</p>
                    <button class="delete">Delete</button>
                    <button class="edit">Edit</button>`

  todoDiv.insertAdjacentHTML('afterbegin', contents)

  return todoDiv
}
