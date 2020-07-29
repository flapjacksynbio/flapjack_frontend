import TagInput from '../Forms/TagInput'
import TextArea from '../Forms/TextArea'

const sbolUrisValidator = ({ getFieldValue }) => ({
  validator(rule, value) {
    if (!value) return Promise.resolve()
    const names = getFieldValue('names')
    if (names && value.length === names.length) {
      return Promise.resolve()
    }
    return Promise.reject('The number of Sbol Uris must match the number of DNA names.')
  },
})

/**
 * Maps required metadata fields
 * @param {'dna'|'chemical'|'signal'} type Field type
 */
const getFieldParams = (type) => {
  switch (type) {
    case 'dna':
      return {
        url: 'dna/',
        buttonCreateLabel: 'DNA',
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
            RenderField: TagInput,
            mode: 'tags',
            style: { width: '100%' },
            rules: [sbolUrisValidator],
            dependencies: ['names'],
          },
        ],
      }
    case 'chemical':
      return {
        url: 'chemical/',
        buttonCreateLabel: 'chemical',
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
        ],
      }
    case 'signal':
      return {
        url: 'signal/',
        buttonCreateLabel: 'Signal',
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
