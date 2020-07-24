import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'

const ShareStudyModal = ({ study, visible }) => {
  return <Modal visible={visible}></Modal>
}

ShareStudyModal.propTypes = {
  study: PropTypes.object,
  visible: PropTypes.bool,
}

export default ShareStudyModal
