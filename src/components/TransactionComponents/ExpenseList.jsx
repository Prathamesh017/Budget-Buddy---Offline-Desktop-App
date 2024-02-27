import React, { useState } from 'react'
import PopupExpense from './PopupExpense'
import updateIcon from '../../assets/icons8-pencil-50.png'
function ExpenseList(props) {
  const [showUpdatePopup, setShowUpdatePopup] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const totalBalance = props.transactionList.reduce(
    (accumulator, currentValue) =>
      currentValue.expense_type === 'income'
        ? accumulator + parseInt(currentValue.expense_amount)
        : accumulator - parseInt(currentValue.expense_amount),
    0,
  )
  return (
    <>
      <div className="expense-div">
        <div className="expense-list-header w-full flex justify-between">
          <h1 className="uppercase text-xl font-medium">Balance</h1>
          <h2
            className={`text-xl ${
              totalBalance > 0 ? 'text-[#21ba45]' : 'text-red-700'
            }`}
          >
            <span>&#8377;</span>
            {totalBalance}
          </h2>
        </div>
        <div className="expense-box-title w-full mt-4">
          <h1 className="text-xl font-semibold bg-gray-300 border border-gray-300 p-2">
            Income
          </h1>
          {props.transactionList.length > 0 &&
            props.transactionList.map((dataObj) => {
              if (dataObj.expense_type === 'income') {
                return (
                  <ExpenseBox
                    key={dataObj.expense_id}
                    data={dataObj}
                    setSelectedTransaction={setSelectedTransaction}
                    onUpdate={setShowUpdatePopup}
                  ></ExpenseBox>
                )
              }
            })}
        </div>
        <div className="expense-box-title w-full">
          <h1 className="text-xl font-semibold bg-gray-300 border border-gray-300 p-2">
            Expense
          </h1>
          {props.transactionList.length > 0 &&
            props.transactionList.map((dataObj) => {
              if (dataObj.expense_type === 'expense') {
                return (
                  <ExpenseBox
                    key={dataObj.name}
                    data={dataObj}
                    onUpdate={setShowUpdatePopup}
                    setSelectedTransaction={setSelectedTransaction}
                  ></ExpenseBox>
                )
              }
            })}
        </div>
      </div>
      {showUpdatePopup && (
        <PopupExpense
          setTransactionList={props.setTransactionList}
          selectedTransaction={selectedTransaction}
          showUpdatePopup={showUpdatePopup}
          transactionList={props.transactionList}
          setShowUpdatePopup={setShowUpdatePopup}
        ></PopupExpense>
      )}
    </>
  )
}

function ExpenseBox(props) {
  return (
    <div className="expense Box">
      <div className="expense-box-header w-full flex justify-between border border-gray-300 p-2">
        <h1 className="text lg font-medium text-sky-700">
          {props.data.expense_name}
        </h1>
        <div className="flex justify-center gap-2">
          <h2
            onClick={async () => {
              
             
            }}
            className={`text-lg ${
              props.data.expense_type === 'income'
                ? 'text-[#21ba45]'
                : 'text-red-700'
            }`}
          >
            <span>&#8377;</span>
            {props.data.expense_amount}
          </h2>
          <button
            onClick={() => {
              props.setSelectedTransaction(props.data)
              props.onUpdate(true)
            }}
            style={{ width: '25px' }}
            className="flex items-center justify-center border border-gray-500 rounded-full"
            o
          >
            <img
              src={updateIcon}
              alt="pen"
              className="w-full h-full p-1 object-contain"
            ></img>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExpenseList
