type State = {
  id: number
  initial: boolean
  state: string
  next: number | null
  keywords: string[]
}

const isArrayUnique = (a: any[]) => {
  return Array.from(new Set(a)).length !== a.length
}

export class Workflow {
  readonly states: State[]

  constructor(states: State[]) {
    this.states = states

    if (isArrayUnique(this.allStates()))
      throw new Error('States must be unique')

    if (isArrayUnique(this.allKeywords()))
      throw new Error('Keywords must be unique')

    if (isArrayUnique(this.states.map(s => s.id)))
      throw new Error('Ids must be unique')

    if (this.states.filter(s => s.initial).length === 0)
      throw new Error('At least one initial state required')

    if (this.states.filter(s => s.keywords.length === 0).length > 0)
      throw new Error('At least one keyword for each state')
  }

  allStates() {
    return this.states.map(s => s.state)
  }

  allKeywords() {
    return this.states.map(s => s.keywords).flat()
  }

  getState(options: Partial<State>): State | undefined {
    return this.states.find(s => {
      let key: keyof State
      for (key in options)
        if (s[key] !== options[key])
          return false
      return true
    })
  }

  nextState(state: string): State | undefined {
    const s = this.getState({ state })
    if (s && s.next)
      return this.getState({ next: s.next })
    return
  }

}
