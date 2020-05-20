import React from 'react'
import TextArea from '~/src/Components/Forms/TextArea'
import PropTypes from 'prop-types'
import { Modal, Button, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import FormFactory from '../Forms/Form'
import Multiselect from '../Forms/Multiselect'
import './Upload.scss'
import api from '../../api'

const CreateStudy = props => {
  const [loading, setLoading] = React.useState(false)
  const [visible, setVisible] = React.useState(false)

  const fields = [
    {
      name: 'name',
      label: 'Name',
      placeholder: 'Name',
      showLabel: true,
      rules: [{ required: true, max: 80, min: 3, whitespace: false }]
    },
    {
      name: 'description',
      label: 'Description',
      showLabel: true,
      RenderField: TextArea
    },
    {
      name: 'doi',
      label: 'DOI',
      placeholder: 'DOI',
      showLabel: true,
      rules: [{ required: true, type: 'url' }]
    }
  ]

  const onSubmit = async ({ name, description, doi }) => {
    setLoading(true)
    const success = await api.post('study/', { name, description, doi })
      .then(({ id }) => !!id)
      .catch(() => false)
    props.callback(success)
    setLoading(false)

    if (success) {
      setVisible(false)
    } else {
      message.error('There was an error creating the study. Please try again')
    }
  }

  return (
    <>
      <Multiselect {...props} />
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
  callback: PropTypes.func
}

export default CreateStudy
