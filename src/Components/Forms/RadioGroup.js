import React from 'react'
import PropTypes from 'prop-types'
import { Form, Radio } from 'antd'

const RadioGroup = ({
  name,
  label = '',
  showLabel = false,
  rules = [],
  options = [],
  optionLabel = '',
}) => {
  const renderOption = (option, i) => {
    const label = typeof option === 'string' ? option : option[optionLabel]
    return (
      <Radio
        value={typeof option === 'string' ? option : option.id}
        key={`${name}-opt-${i}`}
      >
        {label}
      </Radio>
    )
  }

  return (
    <Form.Item hasFeedback name={name} rules={rules} label={showLabel ? label : null}>
      <Radio.Group>{options.map(renderOption)}</Radio.Group>
    </Form.Item>
  )
}

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  rules: PropTypes.array,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.shape({ label: PropTypes.string })]),
  ),
  filterOption: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  optionLabel: PropTypes.string,
}

export default RadioGroup
