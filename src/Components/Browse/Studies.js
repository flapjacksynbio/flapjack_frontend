import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Dropdown, Menu, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import BrowseTable from './BrowseTable'

const Studies = () => {
  const history = useHistory()

  const renderUri = (uri, item) => (
    <a key={`uri-${item.id}`} href={uri} target="_blank" rel="noopener noreferrer">
      {uri}
    </a>
  )

  const renderActions = (text, record) => {
    const handleMenuClick = (e) => {
      history.push({
        pathname: '/view',
        dna: { id: record.id, name: record.name },
        tabType: e.key,
      })
    }

    const menu = (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="data">Data Viewer</Menu.Item>
        <Menu.Item key="analysis">Analysis</Menu.Item>
      </Menu>
    )

    return (
      <Space>
        <Dropdown overlay={menu}>
          <Button>
            View <DownOutlined />
          </Button>
        </Dropdown>
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
      title: 'Acciones',
      key: 'actions',
      render: renderActions,
    },
  ]

  return <BrowseTable columns={columns} dataUrl="study/" />
}

Studies.propTypes = {}

export default Studies
