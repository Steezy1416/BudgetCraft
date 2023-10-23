import { formatNumber } from "../../utils/helper";

const ExpenseSummary = ({
  setModalState,
  modalState,
  budgetContextDispatch,
  closeModal,
}) => {
  const { expenseName, currentAmmount, maxAmmount, color } =
    modalState.modalData;

  const handleUpdateClick = () => {
    setModalState({
      ...modalState,
      modalPurpose: "update",
    });
  };

  const deleteExpense = () => {
    budgetContextDispatch({
      type: "deleteExpense",
      expense: modalState.modalData,
    });
    closeModal();
  };

  return (
    <div
      className="expenseModalContainer"
      style={{ display: modalState.isModalOpen ? "block" : "none" }}
    >
      <div style={{ backgroundColor: color.value }} className="expenseModal">
        <div className="expenseModalHeader">
          <h2>Expense</h2>
        </div>
        <div className="expense-summary-container">
          <p>Name: {expenseName.value}</p>
          <p>Current Ammount: ${formatNumber(currentAmmount.value)}</p>
          <p>Max Ammount: ${formatNumber(maxAmmount.value)}</p>
        </div>
        <div className="expense-btn-container">
          <button className="expenseBtn" onClick={deleteExpense}>
            Delete
          </button>
          <button className="expenseBtn" onClick={handleUpdateClick}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummary;
