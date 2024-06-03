export function todoTemplate(todo) {
  const todoDiv = document.createElement('div')
  todoDiv.classList.add('todo','selectable', 'deletable', 'editable')
  todoDiv.dataset.id = todo.id
  todoDiv.tabIndex = '0'

  const contents = `<h2 class="title selectable">${todo.title}</h2>
                    <p class="description selectable">${todo.description}</p>
                    <p class="description selectable">Due date: ${todo.dueDate}</p>
                    <p class="description selectable">Priority: ${todo.priority}</p>
                    <p class="description selectable">Status: ${todo.currentStatus}</p>
                    <button class="delete">Delete</button>
                    <button class="edit selectable">Edit</button>`

  todoDiv.insertAdjacentHTML('afterbegin', contents)

  return todoDiv
}
