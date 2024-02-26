import React from 'react'
import logo from "../../assets/logo.svg";
function Dashboard() {
  return <div className="w-screen p-4 text-xl bg-indigo-500">
    <div className='header flex gap-2'>
    <img src={logo}  alt="logo"></img>
      <h1 className='text-white'>Budget Buddy</h1>
    </div>
  </div>
}

export default Dashboard
