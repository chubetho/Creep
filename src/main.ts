import './style.css'
import { getSVG } from './modules'

(async () => {
  const a = await getSVG()
  console.log(a)
})()
