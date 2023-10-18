import { useReducer } from "react";
import { formatNumber } from "../../utils/helper";
import { expenseReducer } from "../../reducers/expenseReducer";

const UpdateExpense = ({
  modalState,
  budgetContextData,
  budgetContextDispatch,
  closeModal,
}) => {
  const [updatedExpense, dispatch] = useReducer(
    expenseReducer,
    modalState.modalData
  );

  const { expenseName, currentAmmount, maxAmmount, color } = updatedExpense;

  const updateCurrentAmmount = (e) => {
    dispatch({
      type: "changeCurrentAmmount",
      value: e.target.value,
      totalBalance: budgetContextData.totalBalance,
    });
  };

  const updateMaxAmmount = (e) => {
    dispatch({
      type: "changeMaxAmmount",
      value: e.target.value,
      totalBalance: budgetContextData.totalBalance,
    });
  };

  const updateColor = (e) => {
    dispatch({
      type: "changeColor",
      value: e.target.value,
    });
  };

  const handleExpenseUpdate = (e) => {
    e.preventDefault();

    budgetContextDispatch({
      type: "updateExpense",
      expense: updatedExpense,
    });
    closeModal();
  };

  return (
    <div style={{ display: modalState.isModalOpen ? "block" : "none" }}>
      <div className="modal">
        <h2>Update Expense</h2>
        <div className="badge-container">
          <div>
            <p>Personal: ${formatNumber(budgetContextData.personalBalance)}</p>
          </div>
          <div>
            <p>Savings: ${formatNumber(budgetContextData.savings)}</p>
          </div>
        </div>
        <form className="expense-form" onSubmit={handleExpenseUpdate}>
          <p>Name: {expenseName.value}</p>

          {currentAmmount.errorMessage && <p>{currentAmmount.errorMessage}</p>}
          <label>
            Current Ammount: $
            <input
              defaultValue={currentAmmount.value}
              onChange={updateCurrentAmmount}
              type="number"
              step="any"
              onWheel={(e) => e.currentTarget.blur()}
              inputMode="numeric"
            />
          </label>

          {maxAmmount.errorMessage && <p>{maxAmmount.errorMessage}</p>}
          <label>
            Max Ammount: $
            <input
              defaultValue={maxAmmount.value}
              onChange={updateMaxAmmount}
              type="number"
              step="any"
              onWheel={(e) => e.currentTarget.blur()}
              inputMode="numeric"
            />
          </label>

          <label>
            Color:
            <input
              defaultValue={color.value}
              onChange={updateColor}
              type="color"
            />
          </label>

          <div>
            <button type="button" onClick={closeModal}>
              Cancel
            </button>
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateExpense;
