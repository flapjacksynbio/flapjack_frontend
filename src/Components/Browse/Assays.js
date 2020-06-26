import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Dropdown, Menu, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import BrowseTable from './BrowseTable'

const Assays = () => {
  const history = useHistory()

  const renderActions = (text, record) => {
    const handleMenuClick = (e) => {
      history.push({
        pathname: '/view',
        state: {
          assay: { id: record.id, name: record.name },
          tabType: e.key,
        },
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
      key: 'name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Description',
      key: 'desc',
      dataIndex: 'description',
    },
    {
      title: 'Study',
      key: 'study',
      dataIndex: 'study',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Temperature',
      key: 'temp',
      dataIndex: 'temperature',
      sorter: (a, b) => a - b,
      render: (temp) => `${temp} °C`,
    },
    {
      title: 'Machine',
      key: 'machine',
      dataIndex: 'machine',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: renderActions,
    },
  ]

  return <BrowseTable dataUrl="assay/" columns={columns} />
}

Assays.propTypes = {}

export default Assays
