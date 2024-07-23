export function projectTemplate(project, justCreated = false) {
  const projectItem = document.createElement('li')
  projectItem.classList.add('project','selectable', 'deletable', 'editable', 'information')
  if (justCreated) {
    projectItem.classList.add('just-created')
  }
  projectItem.dataset.id = project.id
  projectItem.tabIndex = '0'

  const contents = `<h2 class="title selectable">${project.title}</h2>
                    <p class="description selectable">${project.description}</p>
                    <button class="delete">Delete</button>
                    <button class="edit selectable">Edit</button>`

  projectItem.insertAdjacentHTML('afterbegin', contents)

  return projectItem
}
