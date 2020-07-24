import React from 'react'
import PropTypes from 'prop-types'
import { Form, Checkbox } from 'antd'

const Field = ({ label, name, rules = [] }) => {
  return (
    <Form.Item name={name} rules={rules} valuePropName="checked">
      <Checkbox>{label}</Checkbox>
    </Form.Item>
  )
}

Field.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  rules: PropTypes.array,
}

export default Field
