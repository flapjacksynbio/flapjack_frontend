import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import Field from './Field'
import './Form.scss'

const FormFactory = ({
  name,
  onSubmit = () => null,
  fields,
  style = {},
  submitText = 'Submit',
  initialValues = {},
  loading = false
}) => {
  return (
    <Form
      name={name}
      onFinish={onSubmit}
      style={style}
      className='flapjack-form'
      labelCol={{ span: 6 }}
      initialValues={initialValues}
    >
      {fields.map(field => <Field {...field} key={`form-${name}-${field.name}`} />)}
      <Form.Item>
        <Button type='primary' htmlType='submit' disabled={loading}>
          {loading ? <LoadingOutlined spin /> : submitText}
        </Button>
      </Form.Item>
    </Form>
  )
}

FormFactory.propTypes = {
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  fields: PropTypes.arrayOf(
    PropTypes.shape(Field.propTypes)
  ),
  style: PropTypes.object,
  submitText: PropTypes.string,
  initialValues: PropTypes.object,
  loading: PropTypes.bool
}

export default FormFactory
