export type TodoEntity = {
  id: number
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
  history: TodoHistory[]
}

type TodoHistory = {
  state: string
  timestamp: Date
}

export const StateTodo = 'TODO'
export const StateDone = 'DONE'
export type TodoState = string

type TodoItemUpdateOptions = {
  name: string
  description: string
  state: TodoState
}

export class TodoItem {
  record: TodoEntity

  get id(): number { return this.record.id }
  get name(): string { return this.record.name }
  get description(): string { return this.record.description }
  get state(): string { return this.record.history[this.record.history.length - 1].state }
  get done(): boolean { return this.state === StateDone }

  set id(value: number) { this.record.id = value }
  set state(value: TodoState) { this.updateState(value) }
  set name(value: string) { this.updateName(value) }

  constructor(record: Partial<TodoEntity>) {
    const now = new Date()
    const defaultHistory: TodoHistory = {
      state: StateTodo,
      timestamp: now
    }
    const defaultTodoEntity: TodoEntity = {
      id: -1,
      name: '',
      description: '',
      createdAt: now,
      updatedAt: now,
      history: [defaultHistory]
    }
    this.record = { ...defaultTodoEntity, ...record }
  }

  update(options: Partial<TodoItemUpdateOptions>) {
    let key: keyof TodoItemUpdateOptions
    for (key in options) {
      const value = options[key]
      if (!value) continue
      switch (key) {
        case 'state':
          this.updateState(value)
          break
        case 'name':
          this.updateName(value)
          break
      }
    }
  }

  updateState(newState: TodoState) {
    const now = new Date()
    this.record.history.push({ state: newState.toUpperCase(), timestamp: now })
    this.record.updatedAt = now
  }

  updateName(newName: string) {
    this.updateStrng('name', newName)
  }

  updateDescription(newDescription: string) {
    this.updateStrng('name', newDescription)
  }

  private updateStrng(key: 'name' | 'description', newString: string) {
    this.record[key] = newString
    this.record.updatedAt = new Date()
  }
}

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
