import { Checkbox } from "./checkbox.js";

const e = React.createElement

export function CheckboxList(props) {
  return e('div', { className: 'checkbox-list' },
    e('div', {},
      e(Checkbox, {})
    ),
    e('div', {},
      e(Checkbox, {})
    ),
    e('div', {},
      e(Checkbox, {})
    )
  );
}