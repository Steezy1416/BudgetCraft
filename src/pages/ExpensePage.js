import { useReducer, useState } from "react";
import { useBudget } from "../BudgetContext";
import { GetPercentage, formatNumber } from "../utils/helper";
import ExpenseModal from "../components/ExpenseModal";
import { expenseReducer, initialExpense } from "../reducers/expenseReducer";

const ExpensePage = () => {
  const budgetData = useBudget();
  const { expensesTotal, expenses } = budgetData;

  const [expenseForm, dispatch] = useReducer(expenseReducer, initialExpense);

  const [modalState, setModalState] = useState({
    modalData: budgetData,
    modalPurpose: "create",
    isModalOpen: false,
  });

  const openModal = () =>
    setModalState({
      ...modalState,
      isModalOpen: true,
      modalPurpose: "create",
    });

  const handleExpenseClick = (expense) => {
    setModalState({
      isModalOpen: true,
      modalData: expense,
      modalPurpose: "summary",
    });
  };

  const closeModal = () => {
    setModalState({ ...modalState, isModalOpen: false });
    dispatch({
      type: "resetForm",
    });
  };

  return (
    <div className="expensePageContainer">
      <div
        onClick={closeModal}
        className={modalState.isModalOpen ? "expenseOverlay" : ""}
      ></div>
      <h1>Your Expenses</h1>

      <div className="expenses-container">
        {expenses.length > 0 ? (
          expenses.map((expense) => {
            const { expenseName, currentAmmount, maxAmmount, color } = expense;

            let formatedCurrentAmmount = formatNumber(currentAmmount.value);

            let formatedMaxAmmount = formatNumber(maxAmmount.value);

            let currentAmmountPercentage = GetPercentage(
              maxAmmount.value,
              currentAmmount.value
            );

            return (
              <div
                style={{ backgroundColor: `${color.value}` }}
                className="expense"
                onClick={() => handleExpenseClick(expense)}
                key={expenseName.value}
              >
                <p className="expenseName">{expenseName.value}</p>
                <p>${`${formatedCurrentAmmount} / $${formatedMaxAmmount}`}</p>
                <div className="outerProgressBar">
                  <div
                    style={{
                      width: `${currentAmmountPercentage}%`,
                    }}
                    className="innerProgressBar"
                  >
                    {currentAmmountPercentage}%
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="noExpensesMessage">You have no expenses</p>
        )}
      </div>
      <div className="boxThing">
        <p className="expenseTotal">
          Expenses Total: ${formatNumber(expensesTotal)}{" "}
        </p>
        <div onClick={openModal} className="addExpenseBtn">
          <i className="fa-solid fa-plus"></i>
        </div>
      </div>
      <ExpenseModal
        modalState={modalState}
        setModalState={setModalState}
        expenseForm={expenseForm}
        dispatch={dispatch}
        closeModal={closeModal}
      />
    </div>
  );
};

export default ExpensePage;
