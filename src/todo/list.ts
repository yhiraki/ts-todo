import { State, Item } from './item'
import { Workflow } from './workflow'

type ListItem = {
  id: number
  parent: number | null
  item: Item
}

type FilterOptions = {
  name: string
  state: State
  done: boolean
}

const defaultWorkflow = new Workflow([
  { id: 1, initial: true, state: 'TODO', next: 2, keywords: ['TODO'] },
  { id: 2, initial: true, state: 'DOING', next: 3, keywords: ['DOING'] },
  { id: 3, initial: false, state: 'DONE', next: null, keywords: ['DONE'] }
])

export class List {
  todos: ListItem[]
  readonly workflow: Workflow
  private lastId: number = 1

  get length(): number { return this.todos.length }

  constructor(todos: ListItem[] = [], workflow: Workflow = defaultWorkflow) {
    this.todos = todos
    this.workflow = workflow
  }

  add(item: Item, id: number | null = null, parent: number | null = null) {
    if (id) this.lastId = Math.max(this.lastId, id)
    this.todos.push({
      id: this.lastId++,
      parent: parent,
      item: item
    })
  }

  delete(id: number) {
    const target = this.find(id)
    if (target)
      this.todos = this.todos.filter(item => item.id !== id)
    return target
  }

  find(id: number): ListItem | undefined {
    return this.todos.find(item => item.id === id)
  }

  filter(options: Partial<FilterOptions>): ListItem[] {
    if ('state' in options && typeof options.state === 'string')
      options.state = options.state.toUpperCase()

    return this.todos.filter(listitem => {
      const item = listitem.item
      let key: keyof FilterOptions

      for (key in options) {
        const value = options[key]
        switch (key) {
          case 'name':
          case 'state':
            if (item[key] !== value) return false
            break
          case 'done':
            if (item.done !== value) return false
            break
        }
      }
      return true
    })
  }
}
