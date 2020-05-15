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
    showLabel = false,
    PrefixComponent = null,
    type = null,
    placeholder = null,
    rules = [],
    addonAfter = null
  } = props

  return (
    <Form.Item
      hasFeedback
      name={name}
      rules={rules}
      label={showLabel ? label : null}
    >
      <Input
        prefix={PrefixComponent && <PrefixComponent />}
        type={type}
        placeholder={placeholder || label}
        addonAfter={addonAfter}
      />
    </Form.Item>
  )
}

Field.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  showLabel: PropTypes.bool,
  type: PropTypes.string,
  PrefixComponent: PropTypes.elementType,
  placeholder: PropTypes.string,
  rules: PropTypes.array,
  RenderField: PropTypes.func,
  addonAfter: PropTypes.string
}

export default Field
