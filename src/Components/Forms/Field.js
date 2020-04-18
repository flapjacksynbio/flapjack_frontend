import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'

const Field = ({
  label,
  name,
  PrefixComponent=null,
  type=null,
  placeholder=null,
  rules={}
}) => {
  return (
    <Form.Item
      hasFeedback
      name={name}
      rules={[{ ...rules }]}
    >
      <Input 
        prefix={PrefixComponent && <PrefixComponent />}
        type={type}
        placeholder={placeholder || label}
      />
    </Form.Item>
  )
}

Field.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  PrefixComponent: PropTypes.element,
  placeholder: PropTypes.string,
  rules: PropTypes.object
}

export default Field
