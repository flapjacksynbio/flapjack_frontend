import React from 'react'
import PropTypes from 'prop-types'
import { Table, Input } from 'antd'
import api from '../../api'
import './Browse.scss'

const BrowseTable = ({
  dataUrl,
  columns,
  searchFields=[]
}) => {
  const [dataSource, setDataSource] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [pagination, setPagination] = React.useState({ current: 1, pageSize: 100, total: 0 })

  const loadData = async (query) => {
    setLoading(true)
    const { count: total, results: data} = await api.get(dataUrl, {}, query)

    setDataSource(data)
    setPagination(pag => ({
      ...pag,
      total,
      current: query.page || pag.current 
    }))

    setLoading(false)
  }

  // eslint-disable-next-line
  React.useEffect(() => { loadData({ page: 1 }) }, [])

  const handleTableChange = ({ current }, search) => {
    const searchQuery = {}
    searchFields.forEach(s => searchQuery[s] = search)
    loadData({ page: current, ...searchQuery })
  }

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
        bordered
      />
    </div>
  )
}

BrowseTable.propTypes = {
  dataUrl: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      dataIndex: PropTypes.string.isRequired,
      key: PropTypes.string,
      sorter: PropTypes.func,
    })
  ),
  searchFields: PropTypes.arrayOf(PropTypes.string)
}

export default BrowseTable
