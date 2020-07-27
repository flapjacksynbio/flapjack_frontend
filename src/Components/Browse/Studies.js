import React from 'react'
import { useHistory } from 'react-router-dom'
import { Space } from 'antd'
import api from '../../api'
import BrowseTable from './BrowseTable'
import ShareStudyModal from './ShareStudyModal'
import DropdownButton from '../HelperComponents/DropdownButton'

const Studies = () => {
  const history = useHistory()
  const [modalStudy, setModalStudy] = React.useState({})

  const renderUri = (uri, item) => (
    <a key={`uri-${item.id}`} href={uri} target="_blank" rel="noopener noreferrer">
      {uri}
    </a>
  )

  const renderActions = (text, record) => {
    const handleViewMenuClick = (e) => {
      // Redirect to View screen with selected parameters
      history.push({
        pathname: '/view',
        state: { study: { id: record.id, name: record.name }, tabType: e.key },
      })
    }

    const viewOptions = {
      data: {
        label: 'Data Viewer',
        onClick: handleViewMenuClick,
      },
      analysis: {
        label: 'Analysis',
        onClick: handleViewMenuClick,
      },
    }

    const notPublic = record.public ? 'private' : 'public'
    const manageOptions = {
      share: {
        label: 'Share',
        onClick: () => {
          setModalStudy(record)
        },
      },
      'toggle-public': {
        label: `Make ${notPublic}`,
        onClick: () =>
          api.patch(`study/${record.id}/`, {
            public: !record.public,
          }),
      },
      delete: {
        label: 'Delete',
        onClick: () => api.delete(`study/${record.id}/`),
      },
    }

    return (
      <Space>
        <DropdownButton label={'View'} options={viewOptions} />
        {record.is_owner && <DropdownButton label={'Manage'} options={manageOptions} />}
      </Space>
    )
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'DOI',
      dataIndex: 'doi',
      key: 'doi',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: renderUri,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: renderActions,
      width: 220,
    },
  ]

  return (
    <>
      <BrowseTable columns={columns} dataUrl="study/" />
      <ShareStudyModal study={modalStudy} setModalStudy={setModalStudy} />
    </>
  )
}

Studies.propTypes = {}

export default Studies
