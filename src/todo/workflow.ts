type State = {
  id: number
  initial: boolean
  state: string
  next: number | null
  keywords: string[]
}

export class Workflow {
  readonly states: State[]

  constructor(states: State[]) {
    this.states = states

    if (Array.from(new Set(this.allStates())).length !== this.allStates().length)
      throw new Error('States must be unique')

    if (Array.from(new Set(this.allKeywords())).length !== this.allKeywords().length)
      throw new Error('Keywords must be unique')

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

}
