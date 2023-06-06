import {
  Col,
  Row,
  Input,
  Typography,
  Radio,
  Select,
  Tag
} from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  filterBySearch,
  filterByStatus,
  filterByPriorities
} from '../../redux/actions'
const { Search } = Input


export default function Filters() {
  const [filters, setFilters] = useState({
    search: '',
    status: 'All',
    priorities: []
  })
  const dispatch = useDispatch()


  const handleChangeSearch = e => {
    setFilters(prev => ({
      ...prev,
      search: e.target.value
    }))

    dispatch(filterBySearch(e.target.value))
  }

  const handleChangeStatus = e => {
    setFilters(prev => ({
      ...prev,
      status: e.target.value
    }))

    dispatch(filterByStatus(e.target.value))
  }

  const handleChangePriorities = value => {
    setFilters(prev => ({
      ...prev,
      priorities: [...value]
    }))

    dispatch(filterByPriorities(value))
  }


  return (
    <Row justify='center'>
      <Col span={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Search
        </Typography.Paragraph>
        <Search
          placeholder='Input search text'
          value={filters.search}
          onChange={handleChangeSearch}
        />
      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Filter By Status
        </Typography.Paragraph>
        <Radio.Group value={filters.status} onChange={handleChangeStatus} >
          <Radio value='All'>All</Radio>
          <Radio value='Completed'>Completed</Radio>
          <Radio value='Todo'>To do</Radio>
        </Radio.Group>
      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Filter By Priority
        </Typography.Paragraph>
        <Select
          mode='multiple'
          allowClear
          placeholder='Please select'
          style={{ width: '100%' }}
          onChange={handleChangePriorities}
        >
          <Select.Option value='High' label='High' >
            <Tag color='red'>High</Tag>
          </Select.Option>
          <Select.Option value='Medium' label='Medium'>
            <Tag color='blue'>Medium</Tag>
          </Select.Option>
          <Select.Option value='Low' label='Low'>
            <Tag color='gray'>Low</Tag>
          </Select.Option>
        </Select>
      </Col>
    </Row>
  )
}
