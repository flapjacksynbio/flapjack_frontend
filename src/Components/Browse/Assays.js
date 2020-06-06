import React from 'react'
import BrowseTable from './BrowseTable'

const Assays = () => {
  const columns = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'Description',
      key: 'desc',
      dataIndex: 'description'
    },
    {
      title: 'Study',
      key: 'study',
      dataIndex: 'study',
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'Temperature',
      key: 'temp',
      dataIndex: 'temperature',
      sorter: (a, b) => a - b,
      render: temp => `${temp} °C`
    },
    {
      title: 'Machine',
      key: 'machine',
      dataIndex: 'machine',
      sorter: (a, b) => a.name.localeCompare(b.name)
    }
  ]

  return (
    <BrowseTable
      dataUrl="assay/"
      columns={columns}
    />
  )
}

Assays.propTypes = {}

export default Assays
