import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Modal } from 'antd'

const ShareStudyModal = ({ study, setModalStudy }) => {
  return <Modal visible={!_.isEmpty(study)} onCancel={() => setModalStudy({})}></Modal>
}

ShareStudyModal.propTypes = {
  study: PropTypes.object.isRequired,
  setModalStudy: PropTypes.func.isRequired,
}

export default ShareStudyModal
