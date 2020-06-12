import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'

const Field = ({ label, name, showLabel = false, placeholder = null, rules = [] }) => {
  return (
    <Form.Item hasFeedback name={name} rules={rules} label={showLabel ? label : null}>
      <Input.TextArea placeholder={placeholder || label} />
    </Form.Item>
  )
}

Field.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  showLabel: PropTypes.bool,
  placeholder: PropTypes.string,
  rules: PropTypes.array,
}

export default Field
