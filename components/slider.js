const e = React.createElement

export function Slider(props) {
  const [value, setValue] = React.useState(props.value || 0)
  const [grabbed, setGrabbed] = React.useState(false)
  const canvasRef = React.useRef(null)

  React.useEffect(() => {
    const mouseUp = () => {
      setGrabbed(false)
    }
    window.addEventListener("mouseup", mouseUp)
    const mouseMove = (event) => {
      if (!grabbed) {
        return
      }
      movePositionBy(event.movementX)
    }
    window.addEventListener("mousemove", mouseMove)
    return () => {
      window.removeEventListener("mouseup", mouseUp)
      window.removeEventListener("mousemove", mouseMove)
    }
  })

  React.useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = props.width
    canvas.height = props.height
    let percent = ((value - props.minValue)) / (props.maxValue - props.minValue)
    if (props.onChanged) {
      props.onChanged(value)
    }
    draw(canvas.getContext('2d'), props.width, props.height, percent, value)
  }, [value])

  const movePositionBy = (x) => {
    const speed = 0.1
    setValue(Math.min(Math.max(value + x * Math.abs(speed), props.minValue), props.maxValue))
  }

  const onMouseDown = () => {
    setGrabbed(true)
  }

  return e('div', { className: 'slider' + (grabbed ? ' scaled' : '') },
    e('canvas', { ref: canvasRef, onMouseDown }),
    e('div', {}, `X: ${Math.ceil(value)}`)
  );
}

function draw(ctx, width, height, percent, value) {
  let linePadding = 50
  let lineY = 150
  let lineWidth = width - linePadding * 2
  let lineHeight = 20
  let lineBorderRadius = 10
  let lineSpacing = 15

  ctx.fillStyle = '#555555'
  ctx.roundRect(linePadding, lineY - lineSpacing, lineWidth, lineHeight, lineBorderRadius)
  ctx.roundRect(linePadding, lineY + lineSpacing, lineWidth, lineHeight, lineBorderRadius)
  ctx.fill()

  ctx.beginPath();
  ctx.fillStyle = '#1875DE'
  ctx.roundRect(linePadding, lineY - lineSpacing, lineWidth * percent, lineHeight, lineBorderRadius)
  ctx.roundRect(linePadding, lineY + lineSpacing, lineWidth * percent, lineHeight, lineBorderRadius)
  ctx.fill()

  let position = linePadding + lineWidth * percent

  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.moveTo(position, lineY - 25)
  ctx.lineTo(position - 45, lineY - 25 - 80)
  ctx.lineTo(position + 45, lineY - 25 - 80)
  ctx.fill()

  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.moveTo(position, lineY + 45)
  ctx.lineTo(position - 45, lineY + 45 + 80)
  ctx.lineTo(position + 45, lineY + 45 + 80)
  ctx.fill()

  // ctx.fillStyle = '#6C6C6E'
  // ctx.font = "40px Arial";
  // ctx.fillText(`X: ${Math.ceil(value)}`, 10, height - 15);
}