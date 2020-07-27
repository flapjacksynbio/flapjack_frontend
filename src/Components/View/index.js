import React from 'react'
import { useLocation } from 'react-router-dom'
import { Tabs, Empty } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import AddTab from './AddTab'
import DataView from './DataView'
import { createTab, editTab, deleteTab } from '../../redux/actions/viewTabs'
import { connect } from 'react-redux'
//import uuid from 'uuid'
import { v1 as uuid } from 'uuid'
import PropTypes from 'prop-types'

const View = ({ tabs, createTab, editTab, deleteTab }) => {
  const location = useLocation()
  const [activeKey, setActiveKey] = React.useState(null)

  const onRenameTab = (title, tabId) => {
    const tab = tabs.find(({ id }) => id === tabId)
    if (!tab) return

    editTab({ ...tab, title })
  }

  // Select newest tab in list when a new tab is added
  React.useEffect(() => {
    const validTab = tabs.find(({ key }) => key === activeKey)
    if (!tabs.length) {
      setActiveKey(null)
    } else if (activeKey === null || !validTab) {
      setActiveKey(tabs[tabs.length - 1].key)
    }
  }, [tabs, activeKey])

  // Create new tab with query parameters
  React.useEffect(() => {
    if (location.state) {
      const { tabType } = location.state

      if (tabType) {
        onAddTab(tabType)
      }
    }
    // eslint-disable-next-line
  }, [])

  // Create new tab
  const onAddTab = (type) => {
    let i, name

    // Count existing tabs with type
    if (type === 'data') {
      // Data tab
      const dataTabsCount = tabs.filter((t) => !t.contentProps.isAnalysis).length
      i = dataTabsCount + 1
      name = 'Data'
    } else {
      // Analysis tab
      const analysisTabsCount = tabs.filter((t) => t.contentProps.isAnalysis).length
      i = analysisTabsCount + 1
      name = 'Analysis'
    }

    const title = `${name} ${i}`
    const tabId = uuid()

    const contentProps = {
      isAnalysis: type !== 'data',
    }

    createTab({
      title,
      id: tabId,
      key: tabId,
      contentProps,
      closable: true,
      plotData: null,
    })
    setActiveKey(tabId)
  }

  const onTabEdit = (targetKey, action) => {
    if (action === 'add') {
      onAddTab()
    } else {
      deleteTab(targetKey)
    }
  }

  const renderAddTab = (
    <AddTab actions={[() => onAddTab('data'), () => onAddTab('analysis')]} />
  )

  return (
    <>
      <Tabs
        onChange={setActiveKey}
        activeKey={activeKey}
        type="editable-card"
        hideAdd
        onEdit={onTabEdit}
        tabBarExtraContent={renderAddTab}
      >
        {tabs.map(({ contentProps, ...tab }) => (
          <Tabs.TabPane
            tab={tab.title}
            key={tab.key}
            closable={tab.closable}
            closeIcon={<CloseOutlined />}
          >
            <DataView
              title={tab.title}
              plotId={tab.id}
              plotData={tab.plotData}
              onRename={(name) => onRenameTab(name, tab.key)}
              {...contentProps}
            />
          </Tabs.TabPane>
        ))}
      </Tabs>
      {activeKey === null && (
        <Empty description="No plots have been created.">{renderAddTab}</Empty>
      )}
    </>
  )
}

View.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      closable: PropTypes.bool,
    }),
  ).isRequired,
  createTab: PropTypes.func.isRequired,
  editTab: PropTypes.func.isRequired,
  deleteTab: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  createTab: (tab) => dispatch(createTab(tab)),
  editTab: (tab) => dispatch(editTab(tab)),
  deleteTab: (tab) => dispatch(deleteTab(tab)),
})

const mapStateToProps = (state) => ({
  tabs: [...Object.values(state.viewTabs)],
})

export default connect(mapStateToProps, mapDispatchToProps)(View)
