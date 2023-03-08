import { Panel } from "./components/panel.js";

let app = new PIXI.Application({
  backgroundColor: 0xdddddd, resizeTo: window, antialias: true
})
document.body.appendChild(app.view)

let mesh = app.stage.addChild(PIXI3D.Mesh3D.createCube())

let light = new PIXI3D.Light()
light.position.set(-1, 0, 3)
PIXI3D.LightingEnvironment.main.lights.push(light)

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(React.createElement(Panel, {
  onChanged: (object) => {
    mesh.position.set(object.x, object.y, object.z)
    mesh.rotationQuaternion.setEulerAngles(0, object.angle, 0)
  }
}, null));