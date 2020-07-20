import React from 'react'
import { message, Modal } from 'antd'
import SteppedFormFactory from '../Forms/SteppedForm'
import { useHistory } from 'react-router-dom'
import apiWebSocket from '../../api/apiWebSocket'
import ExtraInfo from './ExtraInfo'
import uploadSteps from './uploadForm'

const Upload = () => {
  const [loading, setLoading] = React.useState(false)

  const [extraDataVisible, setExtraDataVisible] = React.useState(false)
  const [extraDataFields, setExtraDataFields] = React.useState(null)
  const [extraDataLoading, setExtraDataLoading] = React.useState(false)

  const [connectionSocket, setConnectionSocket] = React.useState(null)

  const history = useHistory()

  const onSubmit = async (data) => {
    window.data = data;
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
          console.log("onConnect")
          setConnectionSocket(socket)
          socket.send(JSON.stringify({ type: 'init_upload', data: form }))
        },
        onReceiveHandlers: {
          ready_for_file(msg, e, socket) {
            console.log("ready_for_file")
            socket.send(fr.result)
          },
          input_requests(msg) {
            console.log("input_requests")
            console.log(msg.data)
            setExtraDataFields(msg.data)
            setExtraDataVisible(true)
          },
          creation_done() {
            console.log("creation_done")
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
        steps={uploadSteps}
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
