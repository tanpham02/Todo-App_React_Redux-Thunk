import {
  Row,
  Tag,
  Checkbox
} from 'antd'
import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { toggleTodoThunk, editTodoThunk, deleteTodoThunk } from '../TodoList/todoListsSlice'

const priorityColorMapping = {
  High: 'red',
  Medium: 'blue',
  Low: 'gray',
}

export default function Todo({
  name,
  priority,
  completed,
  id
}) {
  const [checked, setChecked] = useState(completed)
  const dispatch = useDispatch()
  const textRef = useRef()
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(name)

  const toggleCheckbox = () => {
    setChecked(!checked)
    dispatch(toggleTodoThunk(id))
  }


  const handleEditTodo = e => {
    setEditText(e.target.innerText)
  }

  const handleBlurText = () => {
    setIsEditing(false)
    const data = {
      priority,
      completed,
      id,
      name: editText
    }
    dispatch(editTodoThunk(data))
  }

  const handleRemoveTodo = () => {
    if(window.confirm(`Bạn có chắc chắn muốn xóa nhiệm vụ ${name}`) === true) {
      dispatch(deleteTodoThunk(id))
    }
  }

  return (
    <div id='hover-show'>
      <Row
        justify='space-between'
        style={{
          marginBottom: 3,
          ...(checked ? { opacity: 0.5, textDecoration: 'line-through' } : {}),
        }}
      >
        <Checkbox checked={checked} onClick={toggleCheckbox}>
          <span
            onDoubleClick={(e) => { e.stopPropagation(); e.preventDefault(); setIsEditing(true) }}
            onBlur={handleBlurText}
            onInput={handleEditTodo}
            contentEditable={isEditing}
            ref={textRef}
          >
            {name}
          </span>

        </Checkbox>
        <Tag color={priorityColorMapping[priority]} style={{ margin: 0 }}>
          {priority}
        </Tag>
      </Row>
      <div
        className='icon'
        style={{
          position: 'absolute',
          left: '75%',
          top: 0,
          padding: '0, 20px',
          cursor: 'pointer',
          visibility: 'hidden'
        }}
      >
        <i
          className="fa-solid fa-trash"
          style={{
            color: '#cf1322'
          }}
          onClick={handleRemoveTodo}
        ></i>

      </div>
    </div>
  )
}
