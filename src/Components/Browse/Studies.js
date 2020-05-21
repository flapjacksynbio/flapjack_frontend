import React from 'react'
import BrowseTable from './BrowseTable'

const Studies = () => {
  const renderUri = uri => (
    <a href={uri} target="_blank" rel="noopener noreferrer">{uri}</a>
  )

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'DOI',
      dataIndex: 'doi',
      key: 'doi',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: renderUri
    },
  ]

  return (
    <BrowseTable
      columns={columns}
      dataUrl="study/"
      searchFields={['name']}
    />
  )
}

Studies.propTypes = {}

export default Studies
