import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Input, List, message, Modal } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import api from '../../api'

const ShareStudyModal = ({ study, setModalStudy }) => {
  const handleShare = (e) => {
    // Execute study sharing
    api
      .patch(`study/${study.id}/`, {
        shared_with: [...study.shared_with, e],
      })
      .then((resp) => {
        console.log(resp)
        if (+resp.status === 400) {
          throw new Error("There isn't an user with that email")
        } else if (resp.status > 400) {
          throw new Error('Bad response from server')
        } else {
          message.success('Study successfully shared')
        }
      })
      .catch((err) => message.error(err.message))
  }

  const handleDelete = (e) => {
    const shared_with = _.without(study.shared_with, e)
    api
      .patch(`study/${study.id}/`, { shared_with })
      .then(() => message.success('Study unshared successfully'))
      .catch(() => message.error('There was an error unsharing the study'))
  }

  const renderEmail = (email) => {
    return (
      <List.Item
        actions={[
          <DeleteOutlined
            onClick={() => handleDelete(email)}
            key={`share-list-delete-${email}`}
          />,
        ]}
      >
        {email}
      </List.Item>
    )
  }

  return (
    <Modal
      visible={!_.isEmpty(study)}
      onCancel={() => setModalStudy({})}
      footer={null}
      destroyOnClose={true}
      title="Share study"
    >
      <List
        dataSource={study.shared_with}
        renderItem={renderEmail}
        header={null}
        locale={{ emptyText: 'Study is not shared with any user' }}
      />
      <Input.Search placeholder="User email" enterButton="Share" onSearch={handleShare} />
    </Modal>
  )
}

ShareStudyModal.propTypes = {
  study: PropTypes.object.isRequired,
  setModalStudy: PropTypes.func.isRequired,
}

export default ShareStudyModal
