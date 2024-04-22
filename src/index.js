import Item from './todo'

const td = new Item(
  {
    title: 'first',
    description: 'first todo',
    dueDate: 'tomorrow',
    priority: 'high priority'
  }
)

console.log(td)
td.title = 'new title'
console.log(td.title)
td.title = 'another title'
console.log(td.currentStatus)
td.currentStatus = 'closed'
console.log(td.currentStatus)
