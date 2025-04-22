import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section className='media'>
        <div className='img_prev'></div>
        <div className='reproductor'></div>
      </section>
    </>
  )
}

export default App
