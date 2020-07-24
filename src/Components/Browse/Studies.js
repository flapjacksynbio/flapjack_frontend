import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Dropdown, Menu, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import api from '../../api'
import BrowseTable from './BrowseTable'
import ShareStudyModal from './ShareStudyModal'

const Studies = () => {
  const history = useHistory()
  const [modalStudy, setModalStudy] = React.useState({})
  const [modalVisible, setModalVisible] = React.useState(false)

  const renderUri = (uri, item) => (
    <a key={`uri-${item.id}`} href={uri} target="_blank" rel="noopener noreferrer">
      {uri}
    </a>
  )

  const renderActions = (text, record) => {
    const handleViewMenuClick = (e) => {
      history.push({
        pathname: '/view',
        state: { study: { id: record.id, name: record.name }, tabType: e.key },
      })
    }

    const handleManageMenuClick = (e) => {
      if (e.key === 'make-private') {
        api.patch(`study/${record.id}/`, {
          public: false,
        })
      } else if (e.key === 'make-public') {
        api.patch(`study/${record.id}/`, {
          public: true,
        })
      }
    }

    const viewMenu = (
      <Menu onClick={handleViewMenuClick}>
        <Menu.Item key="data">Data Viewer</Menu.Item>
        <Menu.Item key="analysis">Analysis</Menu.Item>
      </Menu>
    )

    const manageMenu = (
      <Menu onClick={handleManageMenuClick}>
        <Menu.Item key="share">Share</Menu.Item>
        <Menu.Item key="make-private">Make Private</Menu.Item>
        <Menu.Item key="make-public">Make Public</Menu.Item>
        <Menu.Item key="delete">Delete</Menu.Item>
      </Menu>
    )

    return (
      <Space>
        <Dropdown overlay={viewMenu}>
          <Button>
            View <DownOutlined />
          </Button>
        </Dropdown>
        {record.is_owner && (
          <Dropdown overlay={manageMenu}>
            <Button>
              Manage <DownOutlined />
            </Button>
          </Dropdown>
        )}
      </Space>
    )
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'DOI',
      dataIndex: 'doi',
      key: 'doi',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: renderUri,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: renderActions,
      width: 220,
    },
  ]

  return (
    <>
      <BrowseTable columns={columns} dataUrl="study/" />
      <ShareStudyModal study={modalStudy} visible={modalVisible} />
    </>
  )
}

Studies.propTypes = {}

export default Studies
