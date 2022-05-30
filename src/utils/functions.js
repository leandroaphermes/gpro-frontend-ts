import get from 'lodash/get'

/**
 *  Atualiza uma lista, incluindo o novo item ou atualizando, caso ele já exista na lista
 * @param {array} list A lista contendo o array de objetos
 * @param {object} newItem O item a ser inserido ou atualizado na lista
 * @param {object} options Configuração
 * @param {boolean} options.sort Defina se irá se ordenar. Default: false
 * @param {string} options.sortField Coluna de ordenação. Default: "nome"
 * @param {string} options.fieldComparator Coluna unica de comparacao. Default: "nome"
 * @returns {array}
 */
function updateList(list, newItem, options) {
  const defaultOptions = { sort: false, sortField: 'nome', fieldComparator: 'id', ...options }

  let tmp = [...list]

  const idx = list.findIndex(
    (item) =>
      get(item, defaultOptions.fieldComparator) === get(newItem, defaultOptions.fieldComparator)
  )
  if (idx === -1) {
    tmp = [...list, newItem]
  } else {
    tmp[idx] = { ...tmp[idx], ...newItem }
  }

  if (defaultOptions.sort) {
    tmp.sort((a, b) =>
      get(a, defaultOptions.sortField).localeCompare(get(b, defaultOptions.sortField))
    )
  }

  return tmp
}

/**
 * Troca o conteudo da string com os valores passados no objeto de replace
 * @param {string} text
 * @param {object} replaceObject
 */
function replaceAllText(text, replaceObject) {
  if (typeof text !== 'string') throw new Error('Parametro text deve ser do tipo string')

  Object.keys(replaceObject).forEach((x) => {
    text = String(text).replace(new RegExp(x, 'g'), replaceObject[x])
  })

  return text
}

/**
 * Cria uma lista {label, value} para ser usada em Selects
 * @param {array} list A lista contendo o array de objetos
 * @param {string} labelField O nome do campo usado para o label
 * @param {string} valueField O nome do campo usado para o valor
 * @returns {array}
 */
function createSelectOptions(list, labelField, valueField) {
  return list.map((row) => ({ label: row[labelField], value: row[valueField] }))
}

export { updateList, replaceAllText, createSelectOptions }
