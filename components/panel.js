import { SteeringWheel } from "./steering-wheel.js";
import { CheckboxList } from "./checkbox-list.js";
import { DropDown } from "./drop-down.js";
import { List } from "./list.js";
import { TextInput } from "./text-input.js";
import { Slider } from "./slider.js";
import { Label } from "./label.js";

const e = React.createElement

export function Panel(props) {
  const [grabbedPosition, setGrabbedPosition] = React.useState()
  const [position, setPosition] = React.useState({ x: window.innerWidth - 270, y: 20 })
  const [object, setObject] = React.useState({ x: 0, y: 0, z: 0, rotationX: 0, rotationY: 0 })

  React.useEffect(() => {
    const mouseUp = () => {
      setGrabbedPosition(undefined)
    }
    window.addEventListener("mouseup", mouseUp)
    const mouseMove = (event) => {
      if (!grabbedPosition) {
        return
      }
      movePanelTo(event.clientX - grabbedPosition.x, event.clientY - grabbedPosition.y)
    }
    window.addEventListener("mousemove", mouseMove)
    return () => {
      window.removeEventListener("mouseup", mouseUp)
      window.removeEventListener("mousemove", mouseMove)
    }
  }, [grabbedPosition])

  const movePanelTo = (x, y) => {
    setPosition({ x, y })
  }

  const onMouseDown = (event) => {
    setGrabbedPosition({ x: event.clientX - position.x, y: event.clientY - position.y })
  }

  return e('div', { className: 'panel', style: { left: position.x + 'px', top: position.y + 'px' } },
    e('div', { className: 'title', onMouseDown }, `objects`),
    e('div', { className: 'content spacing' },
      e(DropDown),
      e(List),
      e('div', { className: 'columns-2' },
        e('div', { className: '' },
          e(Label, { text: 'Name' }),
          e(TextInput),
          // e(CheckboxList),
          e('div', { className: 'columns-2' },
            e(SteeringWheel, {
              text: 'Rot X',
              width: 600,
              height: 635,
              onChanged: (value) => {
                let obj = { ...object, rotationX: value }
                setObject(obj)
                props.onChanged(obj)
              }
            }),
            e(SteeringWheel, {
              text: 'Rot Y',
              width: 600,
              height: 635,
              onChanged: (value) => {
                let obj = { ...object, rotationY: value }
                setObject(obj)
                props.onChanged(obj)
              }
            })
          )
        ),
        e('div', { className: '' },
          e(Label, { text: 'Transform' }),
          e('div', { className: 'spacing' },
            e(Slider, {
              width: 600,
              height: 270,
              value: 0,
              minValue: -10,
              maxValue: 10,
              onChanged: (value) => {
                let obj = { ...object, x: value }
                setObject(obj)
                props.onChanged(obj)
              }
            }),
            e(Slider, {
              width: 600,
              height: 270,
              value: 0,
              minValue: -10,
              maxValue: 10,
              onChanged: (value) => {
                let obj = { ...object, y: value }
                setObject(obj)
                props.onChanged(obj)
              }
            }),
            e(Slider, {
              width: 600,
              height: 270,
              value: 0,
              minValue: -10,
              maxValue: 10,
              onChanged: (value) => {
                let obj = { ...object, z: value }
                setObject(obj)
                props.onChanged(obj)
              }
            })
          )
        )
      )
    )
  );
}