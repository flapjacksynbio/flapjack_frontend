import React from 'react'
import api from '../../api'
import { Table, Input } from 'antd'
import './Browse.scss'

const Studies = () => {
  const [dataSource, setDataSource] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [pagination, setPagination] = React.useState({ current: 1, pageSize: 100, total: 0 })

  React.useEffect(() => {
    loadData({ page: 1 })
  }, [])

  const loadData = async (query) => {
    setLoading(true)
    const { count: total, results: data} = await api.get('study/', {}, query)
    const parsed = data.map(d => ({ ...d, key: d.id }))
    setDataSource(parsed)
    setPagination(pag => ({ ...pag, total, current: query.page || pag.current }))
    setLoading(false)
  }

  const handleTableChange = ({ current }, search) => {
    loadData({
      page: current,
      name: search
    })
  }

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
      <div className='search-bar'>
        <Input.Search enterButton loading={loading} onSearch={val => handleTableChange(pagination, val)} />
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  )
}

Studies.propTypes = {}

export default Studies
