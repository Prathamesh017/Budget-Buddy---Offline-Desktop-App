import React from 'react'
import Header from '../TransactionComponents/Header'
import Expense from '../TransactionComponents/Expense'
function Body(props) {
  return (
    <div className="w-screen flex justify-center mt-5">
      <div className="w-10/12">
        <Header></Header>
        <Expense
          transactionList={props.transactionList}
          setTransactionList={props.setTransactionList}
        ></Expense>
      </div>
    </div>
  )
}

export default Body
