import React from 'react'
import { Select, Spin } from 'antd'
import api from '../../api'
import debounce from 'lodash/debounce'

const InducerForm = () => {
  const [inducers, setInducers] = React.useState([])
  const [lastFetchId, setLastFetchId] = React.useState(0)
  const [fetching, setFetching] = React.useState(false)

  const fetchInducers = React.useCallback(
    debounce((search) => {
      const fetchId = lastFetchId
      setLastFetchId((idx) => idx + 1)
      setInducers([])
      setFetching(true)

      api.get('inducer/', null, { search }).then(({ results }) => {
        if (fetchId !== lastFetchId) return
        setInducers(results.map(({ id, names }) => ({ value: id, label: names[0] })))
        setFetching(false)
      })
    }),
  )

  // eslint-disable-next-line
  React.useEffect(() => fetchInducers(''), [])

  return (
    <Select
      labelInValue
      placeholder="Select Inducer"
      notFoundContent={fetching ? <Spin size="small" /> : null}
      filterOption={false}
      onSearch={fetchInducers}
      options={inducers}
      showSearch
      style={{ width: '100%' }}
    />
  )
}

InducerForm.propTypes = {}

export default InducerForm
