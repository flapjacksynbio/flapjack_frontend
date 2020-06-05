import React from 'react'
import PropTypes from 'prop-types'
import { Input, Empty, Tag, Checkbox, Row, Col, Spin } from 'antd'
import debounce from 'lodash/debounce'
import api from '../../api'

const ProviderSelect = ({ url, label, selected, setSelected }) => {
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState([])

  const [lastFetchId, setLastFetchId] = React.useState(0)

  const addSelected = (value, checked) => {
    if (checked) {
      setSelected(selected => [...selected.filter(({ id }) => id !== value.id), value])
    } else {
      setSelected(selected => selected.filter(({ id }) => id !== value.id))
    }
  }

  const fetchData = React.useCallback(debounce(search => {
    const fetchId = lastFetchId
    setLastFetchId(idx => idx + 1)

    setLoading(true)
    setData([])

    api.get(url, null, { search })
      .then(({ results }) => {
        if (fetchId !== lastFetchId) return
        setData(results.map(({ id, name }) => ({ id, name })))
        setLoading(false)
      })
  }))

  const renderOptions = () => (
    <Row>
      {data.length && data.map(value =>
        <Col span={24} key={value.id}>
          <Checkbox
            checked={checked.has(value.id)}
            onChange={e => addSelected(value, e.target.checked)}
          >
            {value.name}
          </Checkbox>
        </Col>
      )}
    </Row>
  )
  
  const renderEmpty = () => (
    loading ? <Spin size="small" /> : <Empty description={`No ${label || 'results'} were found`}/>
  )

  // eslint-disable-next-line
  React.useEffect(() => { fetchData('') }, [])

  const checked = new Set(selected.map(({ id }) => id))

  return (
    <div>
      {selected.map(value => <Tag onClose={() => addSelected(value, false)} closable key={value.id}>{value.name}</Tag>)}
      <Input.Search
        placeholder="Search"
        loading={loading}
        onChange={e => fetchData(e.target.value)}
        onSearch={fetchData}
        style={{ marginTop: 10, marginBottom: 10 }}
      />
      {data.length ? renderOptions() : renderEmpty()}
    </div>
  )
}

ProviderSelect.propTypes = {
  url: PropTypes.string.isRequired,
  label: PropTypes.string,
  selected: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  })).isRequired,
  setSelected: PropTypes.func.isRequired
}

export default ProviderSelect
