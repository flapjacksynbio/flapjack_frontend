import React from 'react'
import api from '../../api'
import { Table } from 'antd'

const Studies = () => {
  const [dataSource, setDataSource] = React.useState('')

  React.useEffect(() => {
    api.get('study').then(data => {
      const parsed = data.map(d => ({ ...d, key: d.url }))
      setDataSource(parsed)
    })
  }, [])

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
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
  ]

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  )
}

Studies.propTypes = {}

export default Studies
