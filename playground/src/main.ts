import './style.css'
import { getFP } from '@creep/lib'

const now = new Date()
getFP().then((fp) => {
  const diff = new Date().getTime() - now.getTime()
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div>
      <p>Time: ${diff} ms</p>
      <p>${fp}</p>
    </div>
  `
})
