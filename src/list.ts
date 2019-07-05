
import {TodoState, TodoItem} from './item'

type TodoListFilterOptions = {
  name: string
  state: TodoState
  done: boolean
}

export class TodoList {
  todos: TodoItem[]
  private lastId: number = 0

  get length(): number { return this.todos.length }

  constructor(todos: TodoItem[] = []) {
    this.todos = todos
  }

  add(item: TodoItem) {
    item.id = this.lastId++
    this.todos.push(item)
  }

  delete(id: number) {
    this.todos = this.todos.filter(item => item.id !== id)
  }

  find(id: number): TodoItem | undefined {
    return this.todos.find(item => item.id === id)
  }

  filter(options: Partial<TodoListFilterOptions>): TodoItem[] {
    if ('state' in options && typeof options.state === 'string')
      options.state = options.state.toUpperCase()

    return this.todos.filter(item => {
      let key: keyof TodoListFilterOptions
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
