import React from 'react'
import ExpenseList from './ExpenseList'
import AddExpense from './ExpenseOperation'
import RecentExpense from './RecentExpense'
import { invoke } from '@tauri-apps/api/tauri'
import { v4 as uuid } from 'uuid'
function Expense(props) {
  const emptyExpenseObj = {
    expense_id: uuid().slice(0, 8),
    expense_name: '',
    expense_type: '',
    expense_amount: '',
    expense_date: '',
  }

  async function handleSubmit(transaction) {
    props.setTransactionList((existTransactions) => [
      ...existTransactions,
      transaction,
    ])
    //add in sqlite with rust
    const isTransactionSuccess = await invoke('add_expense', {
      expenseObj: JSON.stringify(transaction),
    })

    //revert state back if transaction failed
    if (!isTransactionSuccess) {
      setTimeout(() => {
        props.setTransactionList(props.transactionList)
        alert('Failed To Add.Try Again')
      }, 3000)
      return false;
    }
    return true;
  }
  return (
    <div className="w-full p-8 bg-slate-50 border border-gray-300 mt-2 grid grid-cols-2 gap-4">
      <div>
        {props.transactionList.length > 0 ? (
          <ExpenseList transactionList={props.transactionList }setTransactionList={props.setTransactionList}></ExpenseList>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xl font-bold">
            <p className="text-sky-700">NO TRANSACTIONS ADDED.</p>
          </div>
        )}
      </div>
      <div>
        <AddExpense
          expenseObj={emptyExpenseObj}
          title={'Add'}
          handleSubmit={handleSubmit}
          transactionList={props.transactionList}
          setTransactionList={props.setTransactionList}
        ></AddExpense>
        <RecentExpense  transactionList={props.transactionList}></RecentExpense>
      </div>
    </div>
  )
}

export default Expense
