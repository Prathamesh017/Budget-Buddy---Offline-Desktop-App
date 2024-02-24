import { useEffect, useState } from 'react'
import './App.css'
import { invoke } from '@tauri-apps/api/tauri'

// Invoke the command
const handleInvoke = () => {
  invoke('start_app');
  // invoke('get_value');
}
function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    handleInvoke()
  })
  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() => {
            setCount((count) => count + 1)
            invoke('handle_increment',{ value: 12 })
            invoke('get_value');
          }}
        >
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
