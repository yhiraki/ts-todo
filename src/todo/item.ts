export type Entity = {
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
  history: History[]
}

type History = {
  state: string
  timestamp: Date
}

type UpdateOptions = {
  name: string
  description: string
  state: State
}

export type State = string
export const TODO: State = 'TODO'
export const DONE: State = 'DONE'

export class Item {
  private record: Entity

  get name(): string { return this.record.name }
  set name(value: string) { this.updateName(value) }

  get description(): string { return this.record.description }

  get state(): State { return this.record.history[this.record.history.length - 1].state }

  get done(): boolean { return this.state === DONE }

  set state(value: State) { this.updateState(value) }

  constructor(record: Partial<Entity>) {
    const now = new Date()
    const defaultHistory: History = {
      state: TODO,
      timestamp: now
    }
    const defaultTodoEntity: Entity = {
      name: '',
      description: '',
      createdAt: now,
      updatedAt: now,
      history: [defaultHistory]
    }
    this.record = { ...defaultTodoEntity, ...record }
  }

  update(options: Partial<UpdateOptions>) {
    let key: keyof UpdateOptions
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

  updateState(newState: State) {
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
