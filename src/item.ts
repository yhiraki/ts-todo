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

type TodoItemUpdateOptions = {
  name: string
  description: string
  state: TodoState
}

export const StateTodo = 'TODO'
export const StateDone = 'DONE'
export type TodoState = string


export class TodoItem {
  private record: TodoEntity

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
