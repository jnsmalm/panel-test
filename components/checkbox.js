const e = React.createElement

export function Checkbox(props) {
  return e('label', { className: 'checkbox' },
    e('input', { type: "checkbox" }),
    `One`,
    e('span', {})
  )
}