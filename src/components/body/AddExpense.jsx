import React from 'react'
import Select from 'react-select'
const transactionTypeOption = [
  { value: 'expense', label: 'Expense' },
  { value: 'income', label: 'Income' },
]

function AddExpense() {
  return (
    <div>
      <h1 className="uppercase text-xl font-medium">Add New Transaction</h1>
      <div className="add-expense-div mt-2 text-base">
        <div className="add-select">
          <h1>Transaction Type</h1>
          <Select
            options={transactionTypeOption}
            onChange={(value) => {
              console.log(value)
            }}
          />
        </div>
        <div className="flex w-full grid grid-cols-5 gap-2 mt-6">
          <div className="transaction-details col-span-3 flex flex-col">
            <label>Transaction Details</label>
            <input
              type="text"
              placeholder="enter transaction"
              className="p-1 border border-slate-400"
            ></input>
          </div>
          <div className="transaction-date flex flex-col col-span-2">
            <label>Transaction Date</label>
            <input type="date" className="p-1 border border-slate-400" onChange={(date)=>{
              console.log(date.target.value);
            }}></input>
          </div>
        </div>
        <div className="w-full mt-6 flex justify-end">
          <button className="bg-indigo-500 py-2 text-white px-4 rounded">
            Add Expense
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddExpense
