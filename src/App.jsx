import { useEffect, useState } from 'react'
import './App.css'
import { invoke } from '@tauri-apps/api/tauri'
import DashBoard from "./components/ParentComponents/Dashboard";
import Body from "./components/ParentComponents/Body";
function App() {
  const [transactionList, setTransactionList] = useState([])
  useEffect(() => {
    handleInvoke()
  }, [])
  const handleInvoke = async () => {
    invoke('start_app')
    const data= await invoke('get_expenses_data')
    setTransactionList(JSON.parse(data))
  }

  return (
    <div className="app">
      <DashBoard></DashBoard>
      <Body
        transactionList={transactionList}
        setTransactionList={setTransactionList}
      ></Body>
    </div>
  )
}

export default App
