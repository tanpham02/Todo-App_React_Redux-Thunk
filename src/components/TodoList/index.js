import {
  Col,
  Row,
  Input,
  Button,
  Select,
  Tag
} from 'antd';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Todo from '../Todo';
import {
  getAllTodosThunk,
  addTodoThunk,
} from './todoListsSlice'
import { todoSelectors } from '../../redux/selectors';

export default function TodoList() {
  const dispatch = useDispatch()
  const todoLists = useSelector(todoSelectors)
  const [todo, setTodo] = useState({
    name: '',
    completed: false,
    priority: 'Medium'
  })

  useEffect(() => {
    dispatch(getAllTodosThunk())
  }, [])

  const handleChangeName = e =>
    setTodo(prev => ({
      ...prev,
      name: e.target.value
    }))

  const handleChangePriority = value => {
    setTodo(prev => ({
      ...prev,
      priority: value
    }))
  }

  const handleAddTodo = () => {
    dispatch(addTodoThunk(todo))

    setTodo(prev => ({
      ...prev,
      name: '',
      priority: 'Medium'
    }))
  }

  return (
    <Row style={{ height: 'calc(100% - 40px)' }}>
      <Col span={24} style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
        {todoLists.map(todo =>
          <Todo
            key={todo.id}
            name={todo.name}
            priority={todo.priority}
            completed={todo.completed}
            id={todo.id}
          />
        )}
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: 'flex' }} compact>
          <Input
            value={todo.name}
            onChange={handleChangeName}
          />
          <Select
            defaultValue="Medium"
            value={todo.priority}
            onChange={handleChangePriority}
          >
            <Select.Option value='High' label='High'>
              <Tag color='red'>High</Tag>
            </Select.Option>
            <Select.Option value='Medium' label='Medium'>
              <Tag color='blue'>Medium</Tag>
            </Select.Option>
            <Select.Option value='Low' label='Low'>
              <Tag color='gray'>Low</Tag>
            </Select.Option>
          </Select>
          <Button
            type='primary'
            onClick={handleAddTodo}
          >
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
