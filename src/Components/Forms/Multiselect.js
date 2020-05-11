import React from 'react'
import PropTypes from 'prop-types'
import { Form, Select } from 'antd'

const Multiselect = ({
  name,
  label = '',
  showLabel = false,
  rules = [],
  placeholder = '',
  options = [],
  filterOption = false,
}) => {
  const renderOption = (option, i) => {
    const label = typeof option === 'string' ? option : option.label
    return (
      <Select.Option value={option} key={`${name}-opt-${i}`}>
        {label}
      </Select.Option>
    )
  }

  return (
    <Form.Item
      hasFeedback
      name={name}
      rules={rules}
      label={showLabel ? label : null}
    >
      <Select
        showSearch
        placeholder={placeholder}
        filterOption={filterOption}
        defaultActiveFirstOption={true}
      >
        {options.map(renderOption)}
      </Select>
    </Form.Item>
  )
}

Multiselect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  rules: PropTypes.array,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ label: PropTypes.string })
    ])
  ),
  filterOption: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ])
}

export default Multiselect
