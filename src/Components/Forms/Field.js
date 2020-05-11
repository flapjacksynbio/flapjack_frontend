import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'

const Field = (props) => {

  const { RenderField = null } = props

  if (RenderField) {
    return <RenderField {...props} />
  }

  const {
    label,
    name,
    PrefixComponent = null,
    type = null,
    placeholder = null,
    rules = [],
  } = props

  return (
    <Form.Item
      hasFeedback
      name={name}
      rules={rules}
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
  PrefixComponent: PropTypes.elementType,
  placeholder: PropTypes.string,
  rules: PropTypes.array,
  RenderField: PropTypes.func,
}

export default Field
