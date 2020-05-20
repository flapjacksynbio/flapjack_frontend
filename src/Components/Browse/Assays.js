import React from 'react'
import api from '../../api'
import { Table, Input } from 'antd'
import './Browse.scss'
const { Column } = Table

const Assays = () => {
  const [dataSource, setDataSource] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [pagination, setPagination] = React.useState({ current: 1, pageSize: 100, total: 0 })

  React.useEffect(() => {
    loadData({ page: 1 })
  }, [])


  const loadData = async (query) => {
    setLoading(true)
    const { count: total, results: data } = await api.get('assay/', {}, query)
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

  return (
    <div>
      <div className='search-bar'>
        <Input.Search enterButton loading={loading} onSearch={val => handleTableChange(pagination, val)} />
      </div>
      <Table
        dataSource={dataSource}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      >
        <Column title="Name" dataIndex="name" key="name" sorter={(a, b) => a.name.localeCompare(b.name)} />
        <Column title="Description" dataIndex="description" key="description" />
        <Column title="Study" dataIndex="study" key="study" sorter={(a, b) => a.name.localeCompare(b.name)} />
        <Column title="Temperature" dataIndex="temperature" key="temperature" sorter={(a, b) => a - b} render={temp => `${temp} °C`} />
        <Column title="Machine" dataIndex="machine" key="machine" sorter={(a, b) => a.name.localeCompare(b.name)} />
      </Table>
    </div>
  )
}

Assays.propTypes = {}

export default Assays
