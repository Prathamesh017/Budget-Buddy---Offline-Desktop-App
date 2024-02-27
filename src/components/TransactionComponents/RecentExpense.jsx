import React from 'react'
import moment from 'moment'

function RecentExpense({ transactionList }) {
  let lastestTransactionByDate=transactionList.sort((a,b)=>{
    return new Date(b.expense_date) - new Date(a.expense_date);
  }).slice(0,5);
  return (
    <div className="w-full  mt-6">
      <h1 className="uppercase text-xl font-medium">Recent Transactions</h1>
      {lastestTransactionByDate.length > 0 &&
        lastestTransactionByDate.map((transaction) => {
          return (
            <div
              key={transaction.expense_id}
              className="flex justify-between w-full border border-slate-200 p-1"
            >
              <div className="flex gap-4">
                <p className='text-violet-700'> {moment(transaction.expense_date).format('Do MMM')}</p>
              </div>
              <p className={`${transaction.expense_type=="income"?"text-[#21ba45]":"text-red-700"}`}>{transaction.expense_amount}</p>
            </div>
          )
        })}
    </div>
  )
}

export default RecentExpense
