import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import BrowseTable from './BrowseTable'

const Assays = () => {
  const renderViewLink = (text, record) => (
    <Link
      to={{
        pathname: '/view',
        assay: { id: record.id, name: record.name },
        tabType: 'data',
      }}
    >
      <Button>View assay</Button>
    </Link>
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
      render: renderViewLink,
    },
  ]

  return <BrowseTable dataUrl="assay/" columns={columns} />
}

Assays.propTypes = {}

export default Assays
