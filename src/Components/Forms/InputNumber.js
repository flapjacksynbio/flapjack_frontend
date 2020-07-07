import React from 'react'
import PropTypes from 'prop-types'
import { Form, InputNumber } from 'antd'

const NumberInput = ({
  label,
  name,
  showLabel = false,
  placeholder = null,
  rules = [],
  ...props
}) => {
  return (
    <Form.Item hasFeedback name={name} rules={rules} label={showLabel ? label : null}>
      <InputNumber placeholder={placeholder || label} {...props} />
    </Form.Item>
  )
}

NumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  showLabel: PropTypes.bool,
  placeholder: PropTypes.string,
  rules: PropTypes.array,
}

export default NumberInput
