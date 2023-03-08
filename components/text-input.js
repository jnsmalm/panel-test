const e = React.createElement

export function TextInput(props) {
  return e('div', { className: 'text-input', style: { marginBottom: '5px' } },
    e('input', { type: 'text', placeholder: 'New polygon' }),
  );
}