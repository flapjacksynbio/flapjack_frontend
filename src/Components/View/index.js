import React from 'react'
import { Tabs, Empty } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import './View.scss'
import AddTab from './AddTab'
import DataView from './DataView'

const View = () => {
  const [tabs, setTabs] = React.useState([])
  const [dataTabCount, setDataTabCount] = React.useState(0)
  const [analysisTabCount, setAnalysisTabCount] = React.useState(0)
  const [activeKey, setActiveKey] = React.useState(null)

  React.useEffect(() => {
    const validTab = tabs.find(({ key }) => key === activeKey)
    if (!tabs.length) {
      setActiveKey(null)
    } else if (activeKey === null || !validTab) {
      setActiveKey(tabs[tabs.length - 1].key)
    }
  }, [tabs, activeKey])

  const onAddTab = type => {
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

    setTabs(tabs => [...tabs, { title: `${name} ${i}`, key: `${tabs.length}`, content: <DataView />, closable: true }])
  }

  const onRemoveTab = targetKey => {
    setTabs(tabs => tabs.filter(({ key }) => key !== targetKey))
  }

  const onTabEdit = (targetKey, action) => {
    if (action === 'add') {
      onAddTab()
    } else {
      onRemoveTab(targetKey)
    }
  }

  const renderAddTab = <AddTab actions={[
    () => onAddTab('data'),
    () => onAddTab('analysis')
  ]} />

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
        {tabs.map(tab => (
          <Tabs.TabPane
            tab={tab.title}
            key={tab.key}
            closable={tab.closable}
            closeIcon={<CloseOutlined />}
          >
            {tab.content}
          </Tabs.TabPane>
        ))}
      </Tabs>
      { activeKey === null && (
        <Empty
          description="No plots have been created."
        >
          {renderAddTab}
        </Empty>
      )}
    </>
  )
}

View.propTypes = {}

export default View
