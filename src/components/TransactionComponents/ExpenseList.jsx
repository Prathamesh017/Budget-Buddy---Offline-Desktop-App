import React from 'react'
function ExpenseList(props) {
  const totalBalance = props.transactionList.reduce(
    (accumulator, currentValue) => 
    currentValue.expense_type==="income"?accumulator + parseInt(currentValue.expense_amount):accumulator - parseInt(currentValue.expense_amount),
    0,
  );
  return (
    <div className="expense-div">
      <div className="expense-list-header w-full flex justify-between">
        <h1 className="uppercase text-xl font-medium">Balance</h1>
        <h2 className={`text-xl ${totalBalance>0?"text-[#21ba45]":"text-red-700"}`}>
          <span>&#8377;</span>{totalBalance}
        </h2>
      </div>
      <div className="expense-box-title w-full mt-4">
        <h1 className="text-xl font-semibold bg-gray-300 border border-gray-300 p-2">
          Income
        </h1>
        {props.transactionList.length>0 && props.transactionList.map((dataObj) => {
          if (dataObj.expense_type === 'income') {
            return <ExpenseBox key={dataObj.expense_id} data={dataObj}></ExpenseBox>
          }
        })}
      </div>
      <div className="expense-box-title w-full">
        <h1 className="text-xl font-semibold bg-gray-300 border border-gray-300 p-2">
          Expense
        </h1>
        {props.transactionList.length>0 && props.transactionList.map((dataObj) => {
          if (dataObj.expense_type === 'expense') {
            return <ExpenseBox key={dataObj.name} data={dataObj}></ExpenseBox>
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
        <h1 className="text lg font-medium text-sky-700">{props.data.expense_name}</h1>
        <h2 onClick={async ()=>{
          // // let isTRUE=await invoke("update_expense",{"invokeMessage":JSON.stringify(props.data)});
          // let isTRUE=await invoke("delete_expense",{id:props.data.expense_id});
        
        }}
          className={`text-lg ${
            props.data.expense_type === 'income' ? 'text-[#21ba45]' : 'text-red-700'
          }`}
        >
          <span>&#8377;</span>
          {props.data.expense_amount}
        </h2>
      </div>
    </div>
  )
}

export default ExpenseList
