import TagInput from '../Forms/TagInput'
import TextArea from '../Forms/TextArea'

/**
 * Maps required metadata fields
 * @param {'dna'|'inducer'|'signal'} type Field type
 */
const getFieldParams = (type) => {
  switch (type) {
    case 'dna':
      return {
        url: 'dna/',
        createFields: [
          {
            name: 'names',
            label: 'Names',
            showLabel: true,
            rules: [{ required: true }],
            RenderField: TagInput,
            mode: 'tags',
            style: { width: '100%' },
          },
          {
            name: 'sboluris',
            label: 'SBOL Uris',
            showLabel: true,
            rules: [{ required: true }],
            RenderField: TagInput,
            mode: 'tags',
            style: { width: '100%' },
          },
        ],
      }
    case 'inducer':
      return {
        url: 'inducer/',
        createFields: [
          {
            name: 'names',
            label: 'Names',
            showLabel: true,
            rules: [{ required: true }],
            RenderField: TagInput,
            mode: 'tags',
            style: { width: '100%' },
          },
          {
            name: 'concentrations',
            label: 'Concentrations',
            showLabel: true,
            rules: [{ required: true }],
            RenderField: TagInput,
            mode: 'tags',
            style: { width: '100%' },
          },
        ],
      }
    case 'signal':
      return {
        url: 'signal/',
        createFields: [
          {
            name: 'name',
            label: 'Name',
            showLabel: true,
            rules: [{ required: true }],
          },
          {
            name: 'description',
            label: 'Description',
            showLabel: true,
            rules: [{ required: true }],
            RenderField: TextArea,
          },
        ],
      }
    default:
      return null
  }
}

export default getFieldParams
