import todo from '../src'

describe('Add todoitem', () => {

  it('Todo count will be incremented.', () => {
    const todos = new todo.List()
    expect(todos.length).toEqual(0)
    todos.add(new todo.Item({ name: 'hoge' }))
    expect(todos.length).toEqual(1)
  })

})

describe('Delete todoitem', () => {

  it('Todo count will be decremented.', () => {
    const todos = new todo.List()
    todos.add(new todo.Item({ name: 'hoge' }))
    expect(todos.length).toEqual(1)
    todos.delete(0)
    expect(todos.length).toEqual(0)
  })

})

describe('Find todotem', () => {

  it('Find by id', () => {
    const todos = new todo.List()
    todos.add(new todo.Item({ name: 'a' }))
    todos.add(new todo.Item({ name: 'b' }))
    todos.add(new todo.Item({ name: 'c' }))

    let result: todo.Item | undefined

    result = todos.find(0)
    if (result) {
      expect(result.id).toEqual(0)
      expect(result.name).toEqual('a')
    } else throw new Error()

    result = todos.find(1)
    if (result) {
      expect(result.id).toEqual(1)
      expect(result.name).toEqual('b')
    } else throw new Error()
  })

})

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

describe('Filter todoitem', () => {

  const t1 = new todo.Item({ name: '1' })
  t1.updateState('DONE')
  const t2 = new todo.Item({ name: '2' })
  t2.updateState('DONE')
  const t3 = new todo.Item({ name: '3' })
  const t4 = new todo.Item({ name: '4' })
  const t5 = new todo.Item({ name: '5' })
  const todos = new todo.List([t1, t2, t3, t4, t5])

  it('Can be filter by state', () => {
    expect(
      todos.filter({ state: 'TODO' })
    ).toEqual(
      [t3, t4, t5]
    )

    expect(
      todos.filter({ state: 'DONE' })
    ).toEqual(
      [t1, t2]
    )
  })

  it('Can be filter by state lower as upper', () => {
    expect(
      todos.filter({ state: 'todo' })
    ).toEqual(
      [t3, t4, t5]
    )
  })

  it('Can be filter by name', () => {
    expect(
      todos.filter({ name: '2' })
    ).toEqual(
      [t2])
  })

})
