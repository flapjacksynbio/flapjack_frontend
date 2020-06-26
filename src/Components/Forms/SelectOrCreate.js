import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, message, Select, Spin, Form } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import FormFactory from './Form'
import debounce from 'lodash/debounce'
import './Form.scss'
import api from '../../api'

const SelectOrCreate = ({ url, createFields, label, ...props }) => {
  const [data, setData] = React.useState([])
  const [lastFetchId, setLastFetchId] = React.useState(0)
  const [fetching, setFetching] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [visible, setVisible] = React.useState(false)

  const fetchData = React.useCallback(
    debounce((search) => {
      const fetchId = lastFetchId
      setLastFetchId((idx) => idx + 1)
      setData([])
      setFetching(true)

      api.get(url, null, { search }).then(({ results }) => {
        if (fetchId !== lastFetchId) return
        setData(
          results.map(({ id, name, names }) => ({ value: id, label: name || names })),
        )
        setFetching(false)
      })
    }),
  )

  // eslint-disable-next-line
  React.useEffect(() => fetchData(''), [])

  const onSubmit = async (form) => {
    setLoading(true)
    const success = await api
      .post(url, form)
      .then(({ id }) => !!id)
      .catch(() => false)
    setLoading(false)

    if (success) {
      setVisible(false)
    } else {
      message.error(`There was an error creating the ${label}. Please try again`)
    }
  }

  return (
    <>
      <Form.Item
        hasFeedback
        name={props.name}
        rules={props.rules}
        label={props.showLabel ? label : null}
      >
        <Select
          labelInValue
          placeholder={`Select ${label}`}
          notFoundContent={fetching ? <Spin size="small" /> : null}
          filterOption={false}
          onSearch={fetchData}
          options={data}
          showSearch
          style={{ width: '100%' }}
        />
      </Form.Item>
      <div className="select-or-create-field">
        <Button onClick={() => setVisible(true)}>
          <PlusOutlined /> Create new {label}
        </Button>
      </div>
      <Modal
        title={`Create new ${label}`}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <FormFactory
          name={`New${label}`}
          onSubmit={onSubmit}
          fields={createFields}
          submitText={`Create ${label}`}
          loading={loading}
        />
      </Modal>
    </>
  )
}

SelectOrCreate.propTypes = {
  url: PropTypes.string.isRequired,
  createFields: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  showLabel: PropTypes.bool,
  rules: PropTypes.array,
}

export default SelectOrCreate
