import React from 'react'

function ExpenseList() {
  let data = [
    {
      type: 'expense',
      amount: 100,
      name: 'Expense 1',
    },
    {
      type: 'expense',
      amount: 200,
      name: 'Expense 2',
    },
    {
      type: 'income',
      amount: 200,
      name: 'Income 2',
    },
    {
      type: 'income',
      amount: 1000,
      name: 'Income 1',
    },
  ]
  return (
    <div className="expense-div">
      <div className="expense-list-header w-full flex justify-between">
        <h1 className="uppercase text-xl font-medium">Balance</h1>
        <h2 className="text-xl text-[#21ba45]">
          <span>&#8377;</span>10000
        </h2>
      </div>
      <div className="expense-box-title w-full mt-4">
        <h1 className="text-xl font-semibold bg-gray-300 border border-gray-300 p-2">
          Income
        </h1>
        {data.map((dataObj) => {
          if (dataObj.type === 'income') {
            return <ExpenseBox data={dataObj}></ExpenseBox>
          }
        })}
      </div>
      <div className="expense-box-title w-full">
        <h1 className="text-xl font-semibold bg-gray-300 border border-gray-300 p-2">
          Expense
        </h1>
        {data.map((dataObj) => {
          if (dataObj.type === 'expense') {
            return <ExpenseBox data={dataObj}></ExpenseBox>
          }
        })}
      </div>
    </div>
  )
}

function ExpenseBox(props) {
  return (
    <div className="expense Box">
      <div className="expense-box-header w-full flex justify-between border border-gray-300 p-2">
        <h1 className="text lg font-medium text-sky-700">{props.data.name}</h1>
        <h2
          className={`text-lg ${
            props.data.type === 'income' ? 'text-[#21ba45]' : 'text-red-700'
          }`}
        >
          <span>&#8377;</span>
          {props.data.amount}
        </h2>
      </div>
    </div>
  )
}

export default ExpenseList
