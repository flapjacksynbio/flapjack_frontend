import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { Collapse, Button, Layout, message } from 'antd'
import ProviderSelection from './ProviderSelection'
import PlotOptions from './PlotOptions'

const Selection = ({ isAnalysis = false, onSubmit }) => {
  const location = useLocation()

  // Query
  const [selectedStudies, setSelectedStudies] = React.useState([])
  const [selectedAssays, setSelectedAssays] = React.useState([])
  const [selectedDna, setSelectedDna] = React.useState([])

  React.useEffect(() => {
    const { study, assay, dna } = location
    if (study) setSelectedStudies([study])
    if (assay) setSelectedAssays([assay])
    if (dna) setSelectedDna([dna])
  }, [location])

  const queryFields = [
    {
      url: 'study',
      label: 'studies',
      header: 'Studies',
      selected: selectedStudies,
      setSelected: setSelectedStudies,
    },
    {
      url: 'assay',
      label: 'assays',
      header: 'Assays',
      selected: selectedAssays,
      setSelected: setSelectedAssays,
    },
    {
      url: 'dna',
      label: 'DNAs',
      header: 'DNA',
      selected: selectedDna,
      setSelected: setSelectedDna,
    },
  ]

  // Plot Options
  const [normalize, setNormalize] = React.useState('None')
  const [tabs, setTabs] = React.useState('Study')
  const [subplots, setSubplots] = React.useState('Name')
  const [markers, setMarkers] = React.useState('DNA')
  const [plot, setPlot] = React.useState('Mean +/- std')

  const plotOptionsFields = [
    {
      name: 'Normalize',
      options: ['Temporal Mean', 'Mean/std', 'Min/Max', 'None'],
      selected: normalize,
      setSelected: setNormalize,
      defaultValue: 'None',
    },
    {
      name: 'Tabs',
      options: ['Study', 'Assay', 'DNA', 'Media', 'Strain', 'Inducer', 'Name'],
      selected: tabs,
      setSelected: setTabs,
      defaultValue: 'Study',
    },
    {
      name: 'Subplots',
      options: ['Study', 'Assay', 'DNA', 'Media', 'Strain', 'Inducer', 'Name'],
      selected: subplots,
      setSelected: setSubplots,
      defaultValue: 'Name',
    },
    {
      name: 'Lines/Markers',
      options: ['Study', 'Assay', 'DNA', 'Media', 'Strain', 'Inducer', 'Name'],
      selected: markers,
      setSelected: setMarkers,
      defaultValue: 'DNA',
    },
    {
      name: 'Plot',
      options: ['Mean', 'Mean +/- std', 'All data points'],
      selected: plot,
      setSelected: setPlot,
      defaultValue: 'Mean +/- std',
    },
  ]

  const renderClear = (selected, setSelected) => (
    <Button
      disabled={!selected.length}
      onClick={(e) => {
        e.stopPropagation()
        setSelected([])
      }}
      size="small"
      type="danger"
    >
      Clear
    </Button>
  )

  const onPlot = () => {
    console.log(selectedStudies)

    if (!selectedStudies.length || !selectedAssays.length || !selectedDna.length) {
      message.error('Please select data to plot')
      return
    }

    const form = {
      studyIds: selectedStudies.map(({ id }) => id),
      assayIds: selectedAssays.map(({ id }) => id),
      dnaIds: selectedDna.map(({ id }) => id),
      plotOptions: { normalize, tabs, subplots, markers, plot },
    }

    onSubmit(form)
  }

  return (
    <Layout>
      <Layout.Content>
        <Collapse defaultActiveKey={['1']}>
          <Collapse.Panel header="Query" key="1">
            <Collapse>
              {queryFields.map((field) => (
                <Collapse.Panel
                  key={field.label}
                  header={field.header}
                  extra={renderClear(field.selected, field.setSelected)}
                >
                  <ProviderSelection {...field} />
                </Collapse.Panel>
              ))}
            </Collapse>
          </Collapse.Panel>
          {isAnalysis && (
            <Collapse.Panel header="Analysis" key="2">
              Analysis
            </Collapse.Panel>
          )}
          <Collapse.Panel header="Plot Options" key="3">
            <PlotOptions fields={plotOptionsFields} />
          </Collapse.Panel>
        </Collapse>
      </Layout.Content>
      <Layout.Footer style={{ padding: 0 }}>
        <Button type="primary" onClick={onPlot} block>
          Plot
        </Button>
      </Layout.Footer>
    </Layout>
  )
}

Selection.propTypes = {
  isAnalysis: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
}

export default Selection
