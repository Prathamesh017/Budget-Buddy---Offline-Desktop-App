import React from 'react'
import ExpenseList from './ExpenseList'
import AddExpense from './AddExpense'
import RecentExpense from './RecentExpense'
function Expense() {
  return <div className="w-full p-8 bg-slate-50 border border-gray-300 mt-2 grid grid-cols-2 gap-4">
  <div>
  <ExpenseList></ExpenseList>
  </div>
  <div>
  <AddExpense></AddExpense>
  <RecentExpense></RecentExpense>
  </div>
  </div>
}

export default Expense
