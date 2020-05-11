import React from 'react'
import { FileAddOutlined } from '@ant-design/icons'
import Multiselect from '~/src/Components/Forms/Multiselect'
import FormFactory from '../Forms/Form'
import PropTypes from 'prop-types'


const FileUpload = ({
  onSubmit,
}) => {
  const studies = ['Study1', 'Study2']


  const fields = [
    {
      name: 'study',
      label: 'Study Name',
      showLabel: true,
      placeholder: 'Study',
      options: studies,
      RenderField: Multiselect,
      rules: [{ required: true }]
    },
    {
      name: 'machine',
      label: 'Machine',
      showLabel: true,
      placeholder: 'Machine',
      options: ['HTX Synergy', 'BMG', 'FluoPi'],
      RenderField: Multiselect,
      rules: [{ required: true }]
    },
    {
      name: 'data_file',
      label: 'Data File',
      showLabel: true,
      type: 'file',
      PrefixComponent: FileAddOutlined,
      rules: [{ required: true }]
    }
  ]

  return (
    <FormFactory
      name="File Upload"
      fields={fields}
      submitText="Next"
      onSubmit={onSubmit}
    />
  )
}

FileUpload.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default FileUpload
