import React from 'react'
import Header from './body/Header'
import Expense from './body/Expense'
function Body() {
  return (
    <div className="w-screen flex justify-center mt-5">
      <div className="w-10/12">
       <Header></Header>
       <Expense></Expense>
      </div>
    </div>
  )
}

export default Body
