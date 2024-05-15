import './style.css'
import { getFP } from '@creep/lib'

const now = performance.now()
getFP().then((fp) => {
  const diff = Math.round(performance.now() - now)
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div>
      <p>Time: ${diff} ms</p>
      <p>${fp}</p>
    </div>
  `
})
