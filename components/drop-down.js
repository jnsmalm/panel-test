const e = React.createElement

export function DropDown(props) {
  return e('div', { className: 'drop-down' },
    e('select', { style: { width: '100%' } },
      e('option', {}, `new object`),
      e('option', {}, `new object`),
      e('option', {}, `new object`),
      e('option', {}, `new object`),
    )
  );
}