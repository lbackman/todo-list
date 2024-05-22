export function projectTemplate(project) {
  const projectDiv = document.createElement('div')
  projectDiv.classList.add('project','selectable', 'deletable', 'editable')
  projectDiv.dataset.id = project.id
  projectDiv.tabIndex = '0'

  const contents = `<h2 class="selectable">${project.title}</h2>
                    <p class="selectable">${project.description}</p>
                    <button class="delete">Delete</button>
                    <button class="edit selectable">Edit</button>`

  projectDiv.insertAdjacentHTML('afterbegin', contents)

  return projectDiv
}
