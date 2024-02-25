import { useEffect, useState } from 'react'
import './App.css'
import { invoke } from '@tauri-apps/api/tauri'

// Invoke the command
const handleInvoke = async () => {
  invoke('start_app');
  await invoke('get_expenses_data').then((data)=>{
    console.log(data);
  })
}
function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    handleInvoke()
  },[])
  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() => {
            setCount((count) => count + 1)
            invoke('add_expense')
          }}
        >
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
