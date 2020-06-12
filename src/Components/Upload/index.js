import React from 'react'
import {
  ExperimentOutlined,
  FileMarkdownOutlined /*ReconciliationOutlined,*/,
} from '@ant-design/icons'
import { Typography, message } from 'antd'
import RadioGroup from '~/src/Components/Forms/RadioGroup'
import TextArea from '~/src/Components/Forms/TextArea'
import SteppedFormFactory from '../Forms/SteppedForm'
// import FileInput from '../Forms/FileInput'
import api from '../../api'
import CreateStudy from './CreateStudy'
import { useHistory } from 'react-router-dom'

const Upload = () => {
  const [loading, setLoading] = React.useState(false)
  const history = useHistory()

  const steps = [
    {
      title: 'Upload File',
      icon: <ExperimentOutlined />,
      fields: [
        {
          name: 'study',
          label: 'Study Name',
          showLabel: true,
          RenderField: CreateStudy,
          rules: [{ required: true }],
        },
        {
          name: 'machine',
          label: 'Machine',
          showLabel: true,
          placeholder: 'Machine',
          options: ['HTX Synergy', 'BMG', 'FluoPi'],
          RenderField: RadioGroup,
          rules: [{ required: true }],
        },
        // {
        //   name: 'data_file',
        //   label: 'Data File',
        //   showLabel: true,
        //   RenderField: FileInput,
        //   rules: [{ required: true }]
        // }
      ],
    },
    {
      title: 'Metadata',
      icon: <FileMarkdownOutlined />,
      fields: [
        {
          name: 'mock_title2',
          label: 'mock_title2',
          RenderField() {
            return (
              <Typography.Title level={3}>
                Assays description and temperature
              </Typography.Title>
            )
          },
        },
        {
          name: 'name',
          label: 'Name',
          showLabel: true,
          rules: [{ required: true, max: 80, min: 3 }],
        },
        {
          name: 'description',
          label: 'Description',
          showLabel: true,
          RenderField: TextArea,
          rules: [{ required: true }],
        },
        {
          name: 'temperature',
          label: 'Temperature',
          showLabel: true,
          type: 'number',
          rules: [{ required: true }],
          addonAfter: '°C',
        },
      ],
    },
    // {
    //   title: 'Signals',
    //   icon: <ReconciliationOutlined />,
    //   fields: [
    //     {
    //       name: 'mock_title',
    //       label: 'mock_title',
    //       RenderField() {
    //         return <Typography.Title level={3}>Name your signals</Typography.Title>
    //       }
    //     },
    //     {
    //       name: 'b',
    //       label: 'B',
    //       showLabel: true,
    //       rules: [{ required: true }],
    //     },
    //     {
    //       name: 'g',
    //       label: 'G',
    //       showLabel: true,
    //       rules: [{ required: true }],
    //     },
    //     {
    //       name: 'r',
    //       label: 'R',
    //       showLabel: true,
    //       rules: [{ required: true }],
    //     }
    //   ]
    // }
  ]

  const onSubmit = async (data) => {
    const { name, machine, description, temperature, study } = data
    setLoading(true)

    const success = await api
      .post('assay/', {
        name,
        machine,
        description,
        temperature,
        study: study.value,
      })
      .then(({ id }) => !!id)
      .catch(() => false)
    setLoading(false)

    if (success) {
      message.success('Data uploaded successfully!')
      history.push('browse')
    } else {
      message.error('There was an error uploading the data.')
    }
  }

  return (
    <SteppedFormFactory
      name="UpladForm"
      steps={steps}
      onSubmit={onSubmit}
      submitText="Submit"
      loading={loading}
    />
  )
}

Upload.propTypes = {}

export default Upload
