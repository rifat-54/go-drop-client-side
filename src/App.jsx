import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
      <h1 className='text-red-500'>Vite + React</h1>
      
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button className='btn btn-primary'>click me</button>
    </>
  )
}

export default App
