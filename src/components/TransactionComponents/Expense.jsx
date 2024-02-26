import React from 'react'
import ExpenseList from './ExpenseList'
import AddExpense from './AddExpense'
import RecentExpense from './RecentExpense'

function Expense(props) {
  return (
    <div className="w-full p-8 bg-slate-50 border border-gray-300 mt-2 grid grid-cols-2 gap-4">
      <div>
        {props.transactionList.length > 0 ? (
          <ExpenseList transactionList={props.transactionList}></ExpenseList>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xl font-bold">
            <p className='text-sky-700'>NO TRANSACTIONS ADDED.</p>
          </div>
        )}
      </div>
      <div>
        <AddExpense
          transactionList={props.transactionList}
          setTransactionList={props.setTransactionList}
        ></AddExpense>
        <RecentExpense></RecentExpense>
      </div>
    </div>
  )
}

export default Expense
