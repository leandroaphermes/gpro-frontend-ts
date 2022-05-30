export function lessThan(rules, value, form, input_name, input_title) {
  return new Promise((resolve, reject) => {
    const field_value_than = parseInt(form.getFieldValue(input_name))
    if (rules.min === parseInt(value) || parseInt(value) < field_value_than) {
      if (parseInt(value) < field_value_than)
        form.setFields([
          {
            name: input_name,
            validating: false,
            errors: []
          }
        ])
      resolve()
    }
    reject(new Error(`Valor deve ser menor que do campo ${input_title}`))
  })
}
