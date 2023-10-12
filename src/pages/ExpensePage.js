import { useState } from "react";
import { useBudget } from "../BudgetContext";
import { formatNumber } from "../utils/helper";
import ExpenseModal from "../components/ExpenseModal";

const ExpensePage = () => {
const budgetData = useBudget()
  const { expensesTotal, expenses } = budgetData;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="expensePageContainer">
      <h1>Your Expenses</h1>
      <div className="expenses-container">
        {
            expenses && 
                expenses.map(expense => (
                    <div>
                        <p>{expense.expenseName}</p>
                    </div>
                ))
        }
      </div>
      <p>Expenses Total: ${formatNumber(expensesTotal)} </p>
      <div onClick={toggleModal} className="addExpenseBtn">
        <i className="fa-solid fa-plus"></i>
      </div>
      <ExpenseModal budgetData={budgetData} isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default ExpensePage;
