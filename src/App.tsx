import { useEffect, useState } from 'react'
import './App.css'
import { invoke } from '@tauri-apps/api/tauri'
import Dashboard from "./components/Dashboard.jsx";
import Body from "./components/Body.jsx";

// Invoke the command
const handleInvoke = async () => {
  invoke('start_app');
  await invoke('get_expenses_data').then((data)=>{
    console.log(data);
  })
}
function App() {
  useEffect(() => {
    handleInvoke()
  },[])
  return (
    <div className='app'>
      <Dashboard></Dashboard>
      <Body></Body>
    </div>
  )
}

export default App
