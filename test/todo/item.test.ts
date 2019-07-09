import todo from '../../src'

describe('Update state', () => {

  let t: todo.Item

  beforeEach(() => {
    t = new todo.Item({ name: 'hoge' })
  })

  it('Default state is TODO', () => {
    expect(t.state).toEqual('TODO')
  })

  it('History is added', () => {
    expect(t['record'].history.length).toEqual(1)
    t.updateState('DONE')
    expect(t['record'].history.length).toEqual(2)
  })

  it('Timestamp is updated', () => {
    const oldTimestamp = t['record'].updatedAt
    t.updateState('DONE')
    expect(oldTimestamp).not.toBe(t['record'].updatedAt)
  })

  it('Can be DONE', () => {
    t.updateState('DONE')
    expect(t.state).toEqual('DONE')
  })

  it('State to be UpperCase', () => {
    t.updateState('done')
    expect(t.state).toEqual('DONE')
  })

  it('Can be some other state', () => {
    t.updateState('CANCELED')
    expect(t.state).toEqual('CANCELED')
  })

  it('Use setter', () => {
    t.state = 'DONE'
    expect(t.state).toEqual('DONE')
  })

  it('Use update() method', () => {
    t.update({ 'state': 'DONE' })
    expect(t.state).toEqual('DONE')
  })

})

describe('Update name', () => {

  let t: todo.Item

  beforeEach(() => {
    t = new todo.Item({ name: 'hoge' })
  })

  it('Name is updated', () => {
    const oldName = t.name
    t.updateName('a')
    expect(oldName).not.toEqual(t.name)
  })

  it('Timestamp is updated', () => {
    const oldTimestamp = t['record'].updatedAt
    t.updateName('a')
    expect(oldTimestamp).not.toBe(t['record'].updatedAt)
  })

  it('Use setter', () => {
    t.name = 'a'
    expect(t.name).toEqual('a')
  })

  it('Use update() method', () => {
    t.update({ 'name': 'a' })
    expect(t.name).toEqual('a')
  })

})
