import * as XLSX from 'xlsx'

/**
 * Carrega arquivo .xlsx e retorna em json
 * @param {File} fileUploadInput
 * @param {Object} options defaults: { header: 1, raw: false }
 * @returns {Promise} results
 */
export default async function loadExcelToJSON(fileUploadInput, options) {
  return new Promise((resolv, reject) => {
    const optionsCombine = {
      header: 1,
      raw: false,
      defval: '',
      dateNF: 'YYYY-MM-DD HH:mm:ss',
      ...options
    }

    if (!fileUploadInput) reject(TypeError('Obrigatorio definir o arquivo'))

    const reader = new FileReader()
    // eslint-disable-next-line func-names
    reader.onload = function () {
      const fileData = reader.result
      const wb = XLSX.read(fileData, { type: 'binary', cellText: false, cellDates: true })

      const first_worksheet = wb.Sheets[wb.SheetNames[0]]
      const data = XLSX.utils.sheet_to_json(first_worksheet, optionsCombine)
      resolv(data)
    }
    reader.onerror = reject
    reader.readAsBinaryString(fileUploadInput)
  })
}
