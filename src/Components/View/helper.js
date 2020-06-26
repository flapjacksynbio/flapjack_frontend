export const downloadJSON = (jsonObject, filename) => {
  const json = JSON.stringify(jsonObject)
  const blob = new Blob([json], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.setAttribute('download', `${filename}.json`)
  link.setAttribute('href', url)
  document.body.appendChild(link)
  link.click()
  link.remove()
}
