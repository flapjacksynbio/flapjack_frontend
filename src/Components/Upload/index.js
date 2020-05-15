import React from 'react'
import { ExperimentOutlined, FileMarkdownOutlined, ReconciliationOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import Multiselect from '~/src/Components/Forms/Multiselect'
import TextArea from '~/src/Components/Forms/TextArea'
import SteppedFormFactory from '../Forms/SteppedForm'
import FileInput from '../Forms/FileInput'

const Upload = () => {
  const studies = ['S1', 'S2']
  const steps = [
    {
      title: 'Upload File',
      icon: <ExperimentOutlined />,
      fields: [
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
          RenderField: FileInput,
          rules: [{ required: true }]
        }
      ]
    },
    {
      title: 'Metadata',
      icon: <FileMarkdownOutlined />,
      fields: [
        {
          name: 'mock_title',
          label: 'mock_title',
          RenderField() {
            return <Typography.Title level={3}>Study Description</Typography.Title>
          }
        },
        {
          name: 'study_description',
          label: 'Description',
          showLabel: true,
          RenderField: TextArea
        },
        {
          name: 'doi',
          label: 'DOI',
          showLabel: true,
          RenderField: TextArea
        },
        {
          name: 'mock_title2',
          label: 'mock_title2',
          RenderField() {
            return <Typography.Title level={3}>Assays description and temperature</Typography.Title>
          }
        },
        {
          name: 'assay_description',
          label: 'Description',
          showLabel: true,
          RenderField: TextArea
        },
        {
          name: 'temperature',
          label: 'Temperature',
          showLabel: true,
          type: 'number',
          rules: [{ required: true }],
          addonAfter: '°C'
        }
      ]
    },
    {
      title: 'Signals',
      icon: <ReconciliationOutlined />,
      fields: [
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
    }
  ]

  return (
    <SteppedFormFactory
      name='UpladForm'
      steps={steps}
      onSubmit={console.log}
      submitText="Submit"
    />
  )
}

Upload.propTypes = {}

export default Upload
