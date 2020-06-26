import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Space } from 'antd'
import BrowseTable from './BrowseTable'

const Assays = () => {
  const renderActions = (text, record) => (
    <Space>
      <Link
        to={{
          pathname: '/view',
          assay: { id: record.id, name: record.name },
          tabType: 'data',
        }}
      >
        <Button>View assay</Button>
      </Link>
      <Link
        to={{
          pathname: '/view',
          assay: { id: record.id, name: record.name },
          tabType: 'analysis',
        }}
      >
        <Button>Analyze assay</Button>
      </Link>
    </Space>
  )

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
