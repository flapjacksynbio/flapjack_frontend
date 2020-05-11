import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'antd'
import FormFactory from '../Forms/Form'

const Signals = ({ onSubmit }) => {
  const fields = [
    {
      name: 'mock_title',
      label: 'mock_title',
      RenderField() {
        return <Typography.Title level={3}>Name your signals</Typography.Title>
      }
    },
    {
      name: 'b',
      label: 'B',
      showLabel: true,
      rules: [{ required: true }],
    },
    {
      name: 'g',
      label: 'G',
      showLabel: true,
      rules: [{ required: true }],
    },
    {
      name: 'r',
      label: 'R',
      showLabel: true,
      rules: [{ required: true }],
    }
  ]

  return (
    <FormFactory
      name="Signals"
      fields={fields}
      submitText="Flapjack your data"
      onSubmit={onSubmit}
    />
  )
}

Signals.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default Signals
