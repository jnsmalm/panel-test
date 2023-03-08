const e = React.createElement

export function SteeringWheel(props) {
  const [angle, setAngle] = React.useState(0)
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
      setAngleFromScreenXY(event.clientX, event.clientY)
    }
    window.addEventListener("mousemove", mouseMove)
    return () => {
      window.removeEventListener("mouseup", mouseUp)
      window.removeEventListener("mousemove", mouseMove)
    }
  }, [grabbed])

  React.useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = props.width
    canvas.height = props.height
    draw(canvas.getContext('2d'), props.width, props.height, angle)
  }, [angle])

  // const draw = () => {
  //   const canvas = canvasRef.current
  //   const context = 
  //   context.fillStyle = '#ff44ff'
  //   context.fillRect(0, 0, canvas.width, canvas.height)

  //   const distance = 95

  //   const backgroundCircleX = canvas.width / 2
  //   const backgroundCircleY = 150

  //   const x = backgroundCircleX + distance * Math.cos(degreesToRadians(angle - 90))
  //   const y = backgroundCircleY + distance * Math.sin(degreesToRadians(angle - 90))

  //   context.fillStyle = '#555555'
  //   context.beginPath()
  //   context.arc(backgroundCircleX, backgroundCircleY, 150, 0, 2 * Math.PI);
  //   context.fill()

  //   context.fillStyle = '#ffffff'
  //   context.beginPath()
  //   context.arc(x, y, 50, 0, 2 * Math.PI);
  //   context.fill()

  //   context.font = "40px Arial";
  //   context.fillText(`Angle: ${Math.ceil(angle)}`, 10, canvas.height - 15);
  // }

  const setAngleFromScreenXY = (x, y) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect();
    const centerX = rect.x + rect.width / 2
    const centerY = rect.y + rect.height / 2
    const degrees = Math.atan2(x - centerX, centerY - y) * (180 / Math.PI)
    if (props.onChanged) {
      props.onChanged(degrees)
    }
    setAngle(degrees)
  }

  const onMouseDown = (event) => {
    setGrabbed(true)
  }

  return e('div', { className: 'steering-wheel' + (grabbed ? ' scaled' : '') },
    e('canvas', { ref: canvasRef, onMouseDown }),
    e('div', {}, `${props.text}: ${Math.ceil(angle)}`)
  );
}

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180)
}

function draw(ctx, width, height, value) {
  const bgCirclePadding = 30
  const bgCircleX = width / 2
  const bgCircleY = 300
  const bgCircleRadius = width / 2 - bgCirclePadding

  ctx.fillStyle = '#555555'
  ctx.beginPath()
  ctx.arc(bgCircleX, bgCircleY, bgCircleRadius, 0, 2 * Math.PI);
  ctx.fill()

  const fgCircleDistance = 175
  const fgCircleX = bgCircleX + fgCircleDistance * Math.cos(degreesToRadians(value - 90))
  const fgCircleY = bgCircleY + fgCircleDistance * Math.sin(degreesToRadians(value - 90))
  const fgCircleRadius = bgCircleRadius / 3

  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.arc(fgCircleX, fgCircleY, fgCircleRadius, 0, 2 * Math.PI);
  ctx.fill()

  // ctx.fillStyle = '#6C6C6E'
  // ctx.font = "40px Arial";
  // ctx.fillText(`Angle: ${Math.ceil(value)}`, 10, height - 15);
}