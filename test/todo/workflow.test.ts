import { Workflow } from '../../src/todo/workflow'


describe('Workflow get state', ()=>{

  const s1 = { id: 1, initial: true, state: 'TODO', next: 2, keywords: ['TODO', 'HOGE'] }
  const s2 = { id: 2, initial: false, state: 'DONE', next: null, keywords: ['DONE', 'FUGA'] }
  const s3 = { id: 3, initial: false, state: 'HOGE', next: 2, keywords: ['A', 'B'] }
  const wf = new Workflow([s1, s2, s3])

  it('By id', () => {
    expect(wf.getState({ id: 1 })).toBe(s1)
    expect(wf.getState({ id: 2 })).toBe(s2)
    expect(wf.getState({ id: 3 })).toBe(s3)
  })

  it('By initial and next', () => {
    expect(wf.getState({ initial: false, next: 2 })).toBe(s3)
  })

})


describe('Workflow', () => {

  it('test all keywords, all states', () => {
    const wf = new Workflow([
      { id: 0, initial: true, state: 'TODO', next: 2, keywords: ['TODO', 'HOGE'] },
      { id: 1, initial: false, state: 'DONE', next: null, keywords: ['DONE', 'FUGA'] }
    ])

    expect(wf.allStates()).toEqual(['TODO', 'DONE'])
    expect(wf.allKeywords()).toEqual(['TODO', 'HOGE', 'DONE', 'FUGA'])
  })

  it('All keywords are unique', () => {
    expect(() => {
      new Workflow([
        { id: 0, initial: true, state: 'TODO', next: 2, keywords: ['TODO', 'HOGE'] },
        { id: 1, initial: false, state: 'DONE', next: null, keywords: ['TODO', 'FUGA'] }
      ])
    }).toThrow(/Keyword/)
  })

  it('All states are unique', () => {
    expect(() => {
      new Workflow([
        { id: 0, initial: true, state: 'TODO', next: 2, keywords: ['TODO', 'HOGE'] },
        { id: 1, initial: false, state: 'TODO', next: null, keywords: ['DONE', 'FUGA'] }
      ])
    }).toThrow(/States/)
  })

  it('At least one initial state', () => {
    expect(() => {
      new Workflow([
        { id: 0, initial: false, state: 'TODO', next: 2, keywords: ['TODO', 'HOGE'] },
        { id: 1, initial: false, state: 'DONE', next: null, keywords: ['DONE', 'FUGA'] }
      ])
    }).toThrow(/Initial state/i)
  })

  it('Ids are unique', () => {
    expect(() => {
      new Workflow([
        { id: 1, initial: false, state: 'TODO', next: 2, keywords: ['TODO', 'HOGE'] },
        { id: 1, initial: false, state: 'DONE', next: null, keywords: ['DONE', 'FUGA'] }
      ])
    }).toThrow(/id/i)
  })

  it('At least one keyword for state', () => {
    expect(() => {
      new Workflow([
        { id: 0, initial: true, state: 'TODO', next: 2, keywords: [] },
        { id: 1, initial: false, state: 'DONE', next: null, keywords: ['DONE', 'FUGA'] }
      ])
    }).toThrow(/one keyword/i)
  })

})
