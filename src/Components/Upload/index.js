import React from 'react'
import { ExperimentOutlined, FileAddOutlined } from '@ant-design/icons'
import { Typography, message, Modal } from 'antd'
import RadioGroup from '~/src/Components/Forms/RadioGroup'
import TextArea from '~/src/Components/Forms/TextArea'
import SteppedFormFactory from '../Forms/SteppedForm'
import FileInput from '../Forms/FileInput'
import CreateStudy from './CreateStudy'
import { useHistory } from 'react-router-dom'
import apiWebSocket from '../../api/apiWebSocket'
import ExtraInfo from './ExtraInfo'

const Upload = () => {
  const [loading, setLoading] = React.useState(false)

  const [extraDataVisible, setExtraDataVisible] = React.useState(false)
  const [extraDataFields, setExtraDataFields] = React.useState(null)
  const [extraDataLoading, setExtraDataLoading] = React.useState(false)

  const [connectionSocket, setConnectionSocket] = React.useState(null)

  const history = useHistory()

  const steps = [
    {
      title: 'Upload File',
      icon: <FileAddOutlined />,
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
        {
          name: 'data_file',
          label: 'Data File',
          showLabel: true,
          RenderField: FileInput,
          rules: [{ required: true }],
        },
      ],
    },
    {
      title: 'Assay',
      icon: <ExperimentOutlined />,
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
  ]

  const onSubmit = async (data) => {
    const { name, machine, description, temperature, study } = data
    setLoading(true)

    const form = {
      name,
      machine,
      description,
      temperature,
      study: study.value,
    }

    const fr = new FileReader()

    fr.addEventListener('loadend', () => {
      apiWebSocket.connect('registry/upload', {
        onConnect(event, socket) {
          setConnectionSocket(socket)
          socket.send(JSON.stringify({ type: 'init_upload', data: form }))
        },
        onReceiveHandlers: {
          ready_for_file(msg, e, socket) {
            socket.send(fr.result)
          },
          input_requests(msg) {
            console.log(msg.data)
            setExtraDataFields(msg.data)
            setExtraDataVisible(true)
          },
          creation_done() {
            setLoading(false)
            message.success('Data uploaded successfully!')
            history.push('browse')
          },
        },
        onError(e, socket) {
          console.log(e)
          message.error('There was an error uploading the data.')
          socket.close()
        },
      })
    })

    fr.readAsArrayBuffer(data.data_file.file.originFileObj)
  }

  const onSubmitExtraInfo = (data) => {
    setExtraDataLoading(true)
    const dataToSend = Object.entries(data).reduce(
      (acc, [key, { value }]) => ({
        ...acc,
        [key]: value,
      }),
      {},
    )
    console.log(dataToSend)
    connectionSocket.send(JSON.stringify({ type: 'metadata', data: dataToSend }))
    setExtraDataLoading(false)
    setExtraDataVisible(false)
  }

  return (
    <>
      <SteppedFormFactory
        name="UpladForm"
        steps={steps}
        onSubmit={onSubmit}
        submitText="Submit"
        loading={loading}
      />
      {!!extraDataFields && (
        <Modal
          title="Metadata"
          visible={extraDataVisible}
          closable={false}
          footer={null}
          width="80%"
        >
          <ExtraInfo
            loading={extraDataLoading}
            onSubmit={onSubmitExtraInfo}
            extraInfoFields={extraDataFields}
          />
        </Modal>
      )}
    </>
  )
}

Upload.propTypes = {}

export default Upload
