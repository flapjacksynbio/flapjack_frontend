import React from 'react'
import BrowseTable from './BrowseTable'

const Assays = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'Description',
      dataIndex: 'description'
    },
    {
      title: 'Study',
      dataIndex: 'study',
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'Temperature',
      dataIndex: 'temperature',
      sorter: (a, b) => a - b,
      render: temp => `${temp} °C`
    },
    {
      title: 'Machine',
      dataIndex: 'machine',
      sorter: (a, b) => a.name.localeCompare(b.name)
    }
  ]

  return (
    <BrowseTable
      dataUrl="assay/"
      columns={columns}
      searchFields={['name']}
    />
  )
}

Assays.propTypes = {}

export default Assays
