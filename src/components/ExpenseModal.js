import { useReducer, useState } from "react";
import { formatNumber } from "../utils/helper";
import { expenseReducer, initialExpense } from "../reducers/expenseReducer";
import { useBudgetDispatch } from "../BudgetContext";

const ExpenseModal = ({ budgetData, isOpen, setIsModalOpen }) => {
  const { personalBalance, savings } = budgetData;
  const budgetDispatch = useBudgetDispatch()
  const [modalPurpose, setModalPurpose] = useState("create");

  const closeModal = () => setIsModalOpen(false);

  const [expenseForm, dispatch] = useReducer(expenseReducer, initialExpense)


  const handleWithdrawalFrom = (e) => {
    dispatch({
        type: "changeWithdrawalFrom",
        value: e.target.value
    })
  }

  const handleExpenseName = (e) => {
    dispatch({
        type: "changeExpenseName",
        value: e.target.value
    })
  }

  const handleCurrentAmmount = (e) => {
    dispatch({
        type: "changeCurrentAmmount",
        value: e.target.value
    })
  }

  const handleMaxAmmount = (e) => {
    dispatch({
        type: "changeMaxAmmount",
        value: e.target.value
    })
  }

  const handleColor = (e) => {
    dispatch({
        type: "changeColor",
        value: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(expenseForm)
    budgetDispatch({
        type: "addExpense",
        expense: expenseForm,
        expenseAmmount: parseFloat(expenseForm.currentAmmount)
    })
  }

  return (
    <div style={{ display: isOpen ? "block" : "none" }} className="">
      <div className="modal">
        <h2>Create Expense</h2>
        <div className="badge-container">
          <div>
            <p>Personal: ${formatNumber(personalBalance)}</p>
          </div>
          <div>
            <p>Savings: ${formatNumber(savings)}</p>
          </div>
        </div>
        <form className="expense-form" onSubmit={handleSubmit}>
          <label onChange={handleWithdrawalFrom}>
            Withdrawal From:
            <select>
              <option value="personal">Personal</option>
              <option value="savings">Savings</option>
            </select>
          </label>
          <label onChange={handleExpenseName}>
            Name:
            <input type="text" />
          </label>
          <label onChange={handleCurrentAmmount}>
            Current Ammount: $
            <input type="number" step="any" inputMode="numeric" value={parseFloat(expenseForm.currentAmmount) || ""} />
          </label>
          <label onChange={handleMaxAmmount}>
            Max Ammount: $
            <input type="number" step="any" inputMode="numeric" value={parseFloat(expenseForm.maxAmmount) || ""} />
          </label>
          <label onChange={handleColor}>
            Color:
            <input type="color" />
          </label>
          <div>
            <button onClick={closeModal}>Cancel</button>
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseModal;
