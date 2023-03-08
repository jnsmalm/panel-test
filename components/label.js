const e = React.createElement

export function Label(props) {
  return e('div', { className: 'label' }, props.text);
}