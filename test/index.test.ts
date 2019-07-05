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

  let todos: todo.List

  beforeEach(() => {
    todos = new todo.List()
    todos.add(new todo.Item({ name: 'a' }))
    todos.add(new todo.Item({ name: 'b' }))
    todos.add(new todo.Item({ name: 'c' }))
  })

  it('Got deleted item', ()=>{
    const item = todos.delete(1)
    expect(item).not.toBeUndefined()
    if (item)
      expect(item.id).toEqual(1)
  })

  it('Got undefined if not found', ()=>{
    const item = todos.delete(5)
    expect(item).toBeUndefined()
  })

  it('Todo count will be decremented.', () => {
    expect(todos.length).toEqual(3)
    todos.delete(1)
    expect(todos.length).toEqual(2)
  })

})

describe('Find todotem', () => {

  let todos: todo.List

  beforeEach(()=>{
    todos = new todo.List()
    todos.add(new todo.Item({ name: 'a' }))
    todos.add(new todo.Item({ name: 'b' }))
    todos.add(new todo.Item({ name: 'c' }))
  })

  it('Find by id', () => {
    let item = todos.find(1)
    expect(item).not.toBeUndefined()
    if (item) {
      expect(item.id).toEqual(1)
      expect(item.item.name).toEqual('a')
    } 

    item = todos.find(2)
    expect(item).not.toBeUndefined()
    if (item) {
      expect(item.id).toEqual(2)
      expect(item.item.name).toEqual('b')
    }
  })

  it('Got undefined if not found', ()=>{
    const item = todos.find(5)
    expect(item).toBeUndefined()
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
  const todos = new todo.List()
  todos.add(t1)
  todos.add(t2)
  todos.add(t3)
  todos.add(t4)
  todos.add(t5)

  it('Id is sequestial added from 1', () => {
    expect(
      todos.todos.map(i => i.id)
    ).toEqual(
      [1, 2, 3, 4, 5]
    )
  })

  it('Can be filter by state', () => {
    expect(
      todos.filter({ state: 'TODO' }).map(i => i.id)
    ).toEqual(
      [3, 4, 5]
    )

    expect(
      todos.filter({ state: 'DONE' }).map(i => i.id)
    ).toEqual(
      [1, 2]
    )
  })

  it('Can be filter by state lower as upper', () => {
    expect(
      todos.filter({ state: 'todo' }).map(i => i.id)
    ).toEqual(
      [3, 4, 5]
    )
  })

  it('Can be filter by name', () => {
    expect(
      todos.filter({ name: '2' }).map(i => i.id)
    ).toEqual(
      [2])
  })

})
