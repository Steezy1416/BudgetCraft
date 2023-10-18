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
    <div style={{ display: modalState.isModalOpen ? "block" : "none" }}>
      <div className="modal">
        <h2>Expense</h2>
        <div className="expense-summary-container">
          <p>Name: {expenseName.value}</p>
          <p>Current Ammount: ${formatNumber(currentAmmount.value)}</p>
          <p>Max Ammount: ${formatNumber(maxAmmount.value)}</p>
          <p>Color: {color.value}</p>
        </div>
        <div>
          <button onClick={deleteExpense}>Delete</button>
          <button onClick={handleUpdateClick}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummary;
