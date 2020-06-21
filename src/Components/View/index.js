import React from 'react'
import { useLocation } from 'react-router-dom'
import { Tabs, Empty } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import AddTab from './AddTab'
import DataView from './DataView'
import { createTab, editTab, deleteTab } from '../../redux/actions/viewTabs'
import { connect } from 'react-redux'
//import uuid from 'uuid'
import {v1 as uuid} from "uuid"; 
import PropTypes from 'prop-types'

const View = ({ tabs, createTab, editTab, deleteTab }) => {
  const location = useLocation()
  const [dataTabCount, setDataTabCount] = React.useState(0)
  const [analysisTabCount, setAnalysisTabCount] = React.useState(0)
  const [activeKey, setActiveKey] = React.useState(null)

  const onRenameTab = (title, tabId) => {
    const tab = tabs.find(({ id }) => id === tabId)
    if (!tab) return

    editTab({ ...tab, title })
  }

  React.useEffect(() => {
    const validTab = tabs.find(({ key }) => key === activeKey)
    if (!tabs.length) {
      setActiveKey(null)
    } else if (activeKey === null || !validTab) {
      setActiveKey(tabs[tabs.length - 1].key)
    }
  }, [tabs, activeKey])

  React.useEffect(() => {
    const { tabType } = location
    if (tabType) {
      onAddTab(tabType)
    }
    // eslint-disable-next-line
  }, [])

  const onAddTab = (type) => {
    let i, name

    if (type === 'data') {
      i = dataTabCount + 1
      name = 'Data'
      setDataTabCount(i)
    } else {
      i = analysisTabCount + 1
      name = 'Analysis'
      setAnalysisTabCount(i)
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
