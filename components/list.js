const e = React.createElement

export function List(props) {
  return e('div', { className: 'list' },
    e('div', {}, `New polygon`),
    e('div', {}, `New object`),
    e('div', {}, `New object`),
  );
}