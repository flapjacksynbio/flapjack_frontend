import React from 'react'
import TextArea from '~/src/Components/Forms/TextArea'
import PropTypes from 'prop-types'
import { Modal, Button, message, Select, Spin, Form } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import FormFactory from '../Forms/Form'
import debounce from 'lodash/debounce'
import './Upload.scss'
import api from '../../api'

const CreateStudy = (props) => {
  const [studies, setStudies] = React.useState([])
  const [lastFetchId, setLastFetchId] = React.useState(0)
  const [fetching, setFetching] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [visible, setVisible] = React.useState(false)

  const fetchStudies = React.useCallback(
    debounce((search) => {
      const fetchId = lastFetchId
      setLastFetchId((idx) => idx + 1)
      setStudies([])
      setFetching(true)

      api.get('study/', null, { search }).then(({ results }) => {
        if (fetchId !== lastFetchId) return
        setStudies(results.map(({ id, name }) => ({ value: id, label: name })))
        setFetching(false)
      })
    }),
  )

  // eslint-disable-next-line
  React.useEffect(() => fetchStudies(''), [])

  const fields = [
    {
      name: 'name',
      label: 'Name',
      placeholder: 'Name',
      showLabel: true,
      rules: [{ required: true, max: 80, min: 3, whitespace: false }],
    },
    {
      name: 'description',
      label: 'Description',
      showLabel: true,
      RenderField: TextArea,
      rules: [{ required: true }],
    },
    {
      name: 'doi',
      label: 'DOI',
      placeholder: 'DOI',
      showLabel: true,
      rules: [{ required: true, type: 'url' }],
    },
  ]

  const onSubmit = async ({ name, description, doi }) => {
    setLoading(true)
    const success = await api
      .post('study/', { name, description, doi })
      .then(({ id }) => !!id)
      .catch(() => false)
    setLoading(false)

    if (success) {
      setVisible(false)
    } else {
      message.error('There was an error creating the study. Please try again')
    }
  }

  return (
    <>
      <Form.Item
        hasFeedback
        name={props.name}
        rules={props.rules}
        label={props.showLabel ? props.label : null}
      >
        <Select
          labelInValue
          placeholder="Select Study"
          notFoundContent={fetching ? <Spin size="small" /> : null}
          filterOption={false}
          onSearch={fetchStudies}
          options={studies}
          showSearch
          style={{ width: '100%' }}
        />
      </Form.Item>
      <div className="study-field">
        <Button onClick={() => setVisible(true)}>
          <PlusOutlined /> Create new study
        </Button>
      </div>
      <Modal
        title="Create new study"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <FormFactory
          name="NewStudy"
          onSubmit={onSubmit}
          fields={fields}
          submitText="Create Study"
          loading={loading}
        />
      </Modal>
    </>
  )
}

CreateStudy.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  showLabel: PropTypes.bool,
  rules: PropTypes.array,
}

export default CreateStudy
