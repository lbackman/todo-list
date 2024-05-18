export function projectTemplate(project) {
  const projectDiv = document.createElement('div')
  projectDiv.classList.add('project', 'deletable')

  const contents = `<h2>${project.title}</h2>
                    <p>${project.description}</p>
                    <button class="delete">Delete</button>
                    <button>Edit</button>`

  projectDiv.insertAdjacentHTML('afterbegin', contents)
  return projectDiv
}
