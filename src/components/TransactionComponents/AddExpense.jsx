import { useState } from 'react'
import Select from 'react-select'
import { invoke } from '@tauri-apps/api/tauri'
const transactionTypeOption = [
  { value: 'expense', label: 'Expense' },
  { value: 'income', label: 'Income' },
]

const emptyExpenseObj = {
  expense_name: '',
  expense_type: '',
  expense_amount: '',
  expense_date: '',
}

function AddExpense(props) {
  const [transaction, setTransaction] = useState(emptyExpenseObj)
  const [checkForError, setCheckForError] = useState(false)
  async function handleSubmit() {
    //check if  all data exists
    const isTransactionCompleted = Object.entries(transaction).some(
      ([, value]) => {
        return !value
      },
    )
    setCheckForError(isTransactionCompleted)
    if (isTransactionCompleted) {
      return
    }
    props.setTransactionList((existTransactions) => [
      ...existTransactions,
      transaction,
    ])
    //add in sqlite with rust
    const isTransactionSuccess = await invoke('add_expense', {
      invokeMessage: JSON.stringify(transaction),
    })
    console.log(isTransactionSuccess)
    //revert state back if transaction failed
    if (!isTransactionSuccess) {
      setTimeout(() => {
        props.setTransactionList(props.transactionList)
        alert('Failed To Add.Try Again')
      }, 3000)
    }

    setTransaction(emptyExpenseObj)
  }
  return (
    <div>
      <h1 className="uppercase text-xl font-medium">Add New Transaction</h1>
      <div className="add-expense-div mt-2 text-base">
        <div className="add-select">
          <h1>Transaction Type</h1>
          <Select
            id="type"
            value={
              transaction.expense_type
                ? transaction.expense_type === 'income'
                  ? transactionTypeOption[1]
                  : transactionTypeOption[0]
                : transaction.expense_type
            }
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderColor:
                  checkForError && !transaction.expense_type ? 'red' : 'gray',
              }),
            }}
            options={transactionTypeOption}
            noOptionsMessage={() => 'No more options'}
            onChange={(data) => {
              setTransaction({ ...transaction, expense_type: data.value })
            }}
          />
        </div>
        <div className="flex w-full grid grid-row lg:grid-cols-5 gap-2 mt-6">
          <div className="transaction-details  col-span-3 flex flex-col">
            <label>Transaction Details</label>
            <input
              id="name"
              type="text"
              value={transaction.expense_name}
              placeholder="enter transaction"
              className={`p-1 border  rounded ${
                checkForError && !transaction.expense_name
                  ? 'border-red-700'
                  : 'border-slate-400'
              }`}
              onChange={(event) => {
                setTransaction({
                  ...transaction,
                  expense_name: event.target.value,
                })
              }}
            ></input>
          </div>
          <div className="transaction-date flex flex-col col-span-2">
            <label className="md:text-base">Transaction Date</label>
            <input
              id="date"
              type="date"
              value={transaction.expense_date}
              className={`p-1 border   rounded ${
                checkForError && !transaction.expense_date
                  ? 'border-red-700'
                  : 'border-slate-400'
              }`}
              onChange={(event) => {
                setTransaction({
                  ...transaction,
                  expense_date: event.target.value,
                })
              }}
            ></input>
          </div>
        </div>
        <div className="w-full mt-6 flex flex-col lg:flex-row justify-between">
          <div className="flex flex-col">
            <label>
              Add Amount<span>&#8377;</span>
            </label>
            <input
              id="amount"
              type="number"
              placeholder="enter amount"
              className={`p-1 border rounded   ${
                checkForError && !transaction.expense_amount
                  ? 'border-red-700'
                  : 'border-slate-400'
              } ${
                transaction.expense_type === 'expense'
                  ? 'text-red-700'
                  : 'text-[#21ba45]'
              }`}
              onChange={(event) => {
                setTransaction({
                  ...transaction,
                  expense_amount: event.target.value,
                })
                event.target.value
              }}
            ></input>
          </div>
          <button
            className="bg-indigo-500 hover:bg-indigo-700 py-2 text-white hover:text-black cursor-pointer px-4 mt-2 lg:mt-0 self-start lg:self-end rounded"
            onClick={handleSubmit}
          >
            Add Expense
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddExpense
