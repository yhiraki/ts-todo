import { State, Item } from './item'

type FilterOptions = {
  name: string
  state: State
  done: boolean
}

export class List {
  todos: Item[]
  private lastId: number = 0

  get length(): number { return this.todos.length }

  constructor(todos: Item[] = []) {
    this.todos = todos
  }

  add(item: Item) {
    item.id = this.lastId++
    this.todos.push(item)
  }

  delete(id: number) {
    this.todos = this.todos.filter(item => item.id !== id)
  }

  find(id: number): Item | undefined {
    return this.todos.find(item => item.id === id)
  }

  filter(options: Partial<FilterOptions>): Item[] {
    if ('state' in options && typeof options.state === 'string')
      options.state = options.state.toUpperCase()

    return this.todos.filter(item => {
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
