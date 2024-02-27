import React, { useEffect, useRef } from 'react'
import AddExpense from './ExpenseOperation'
import { invoke } from '@tauri-apps/api/tauri'
function PopupExpense(props) {
  const containerRef = useRef(null)
  let isFlag = false
  function handleOutsideClicks(event) {
   
    if (
      containerRef &&
      containerRef.current &&
      (!containerRef.current.contains(event.target) ||
        !containerRef.current.contains('react-select')) &&
      isFlag
    ) {
      props.setShowUpdatePopup(false)
    }
    isFlag = true
  }

  async function handleUpdate(transaction) {
   
    let filteredTransactionList=props.transactionList.map(
      (transactionObj) => {
          if(transactionObj.expense_id === transaction.expense_id){
            return transaction;
          }
          return transactionObj;
      },
    )
    props.setTransactionList(filteredTransactionList)
    let isTransactionSuccess = await invoke('update_expense', {
      expenseObj: JSON.stringify(transaction),
    })

    if (!isTransactionSuccess) {
      setTimeout(() => {
        props.setTransactionList(props.transactionList)
        alert('Failed To Update.Try Again')
      }, 3000)
    }
    props.setShowUpdatePopup(false)
  }
  async function handleDelete(){
    const filteredTransactionList = props.transactionList.filter(
      (transactionObj) => {
        return transactionObj.expense_id !== props.selectedTransaction.expense_id;
      },
    )
    props.setTransactionList(filteredTransactionList)
  
    let isTransactionSuccess =await invoke("delete_expense",{"id":props.selectedTransaction.expense_id});
    
    //revert changes back
    if (!isTransactionSuccess) {
      setTimeout(() => {
        props.setTransactionList(props.transactionList)
        alert('Failed To Delete.Try Again')
      }, 3000)
    }
    props.setShowUpdatePopup(false)
  }

  useEffect(() => {
    document.addEventListener('click', handleOutsideClicks)
  }, [])
  return (
    <>
      <div className="overlay"></div>
      <div className="popup-container bg-slate-50 p-4" ref={containerRef}>
        <AddExpense
          title={'Update'}
          expenseObj={props.selectedTransaction}
          handleSubmit={handleUpdate}
        ></AddExpense>
        <div className="buttons w-full flex justify-between mt-4">
          <button onClick={handleDelete} className="bg-sky-400 hover:bg-sky-700 py-2 text-white cursor-pointer px-4 mt-2 lg:mt-0 self-start lg:self-end rounded">
            Delete
          </button>
          <button className="bg-red-600 hover:bg-red-700 py-2 text-white cursor-pointer px-4 mt-2 lg:mt-0 self-start lg:self-end rounded" onClick={()=>{props.setShowUpdatePopup(false)}}>Close</button>
        </div>
      </div>
    </>
  )
}

export default PopupExpense
