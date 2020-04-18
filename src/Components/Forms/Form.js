import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'antd'
import Field from './Field'
import './Form.scss'

const FormFactory = ({
  name,
  onSubmit=()=>null,
  fields,
  style={},
}) => {
  return (
    <Form name={name} onFinish={onSubmit} style={style} className='flapjack-form'>
      {fields.map(field => <Field {...field} key={`form-${name}-${field.name}`} />)}
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Submit
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
  style: PropTypes.object
}

export default FormFactory
