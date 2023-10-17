import { useState } from "react";
import { useBudget } from "../BudgetContext";
import { formatNumber } from "../utils/helper";
import ExpenseModal from "../components/ExpenseModal";

const ExpensePage = () => {
const budgetData = useBudget()
  const { expensesTotal, expenses } = budgetData;
  
  const [modalState, setModalState] = useState({
    modalData: budgetData,
    modalPurpose: "create",
    isModalOpen: false
  });

  const openModal = () => setModalState({
    ...modalState, 
    isModalOpen: true, 
    modalPurpose: "create"});

  const handleExpenseClick = (expense) => {
    setModalState({
        isModalOpen: true,
        modalData: expense,
        modalPurpose: "summary"
    })
  }

  return (
    <div className="expensePageContainer">
      <h1>Your Expenses</h1>
      <div className="expenses-container">
        {
            expenses && 
                expenses.map(expense => (
                    <div onClick={() => handleExpenseClick(expense)} key={expense.expenseName}>
                        <p>{expense.expenseName}</p>
                    </div>
                ))
        }
      </div>
      <p>Expenses Total: ${formatNumber(expensesTotal)} </p>
      <div onClick={openModal} className="addExpenseBtn">
        <i className="fa-solid fa-plus"></i>
      </div>
      <ExpenseModal modalState={modalState} setModalState={setModalState} />
    </div>
  );
};

export default ExpensePage;
