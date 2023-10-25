import { useReducer } from "react";
import { formatNumber } from "../../utils/helper";
import { expenseReducer } from "../../reducers/expenseReducer";
import Color from "../ColorInput";

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
    dispatch({
      type: "changeMaxAmmount",
      value: maxAmmount.value,
      totalBalance: budgetContextData.totalBalance,
    });
  };

  const updateMaxAmmount = (e) => {
    dispatch({
      type: "changeMaxAmmount",
      value: e.target.value,
      totalBalance: budgetContextData.totalBalance,
    });
    dispatch({
      type: "changeCurrentAmmount",
      value: currentAmmount.value,
      totalBalance: budgetContextData.totalBalance,
    });
  };

  const updateColor = (color) => {
    dispatch({
      type: "changeColor",
      value: color,
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
    <div
      className="expenseModalContainer"
      style={{ display: modalState.isModalOpen ? "block" : "none" }}
    >
      <div
        style={{
          backgroundColor: `${color.value}`,
          color: `${color.value === "#ffffff" ? "black" : "#ced4da"}`,
        }}
        className="expenseModal"
      >
        <div className="expenseModalHeader">
          <h2>Update Expense</h2>
          <i onClick={closeModal} className="fa-solid fa-xmark xmarkIcon"></i>
        </div>
        <div className="badge-container">
          <div className="expenseBadge personalBadge">
            <p>Personal</p>
            <p>${formatNumber(budgetContextData.personalBalance)}</p>
          </div>
          <div className="expenseBadge savingsBadge">
            <p>Savings</p>
            <p>${formatNumber(budgetContextData.savings)}</p>
          </div>
        </div>
        <form className="expense-form" onSubmit={handleExpenseUpdate}>
          <p>Name: {expenseName.value}</p>

          {currentAmmount.errorMessage && (
            <p className="form-error-msg">{currentAmmount.errorMessage}</p>
          )}
          <label className="expenseLabel">
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

          {maxAmmount.errorMessage && (
            <p className="form-error-msg">{maxAmmount.errorMessage}</p>
          )}
          <label className="expenseLabel">
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

          <div className="colorLabel">
            <p>Color:</p>
            <div className="expenseColorContainer">
              <Color
                dispatch={dispatch}
                handleColor={updateColor}
                currentColor={color.value}
                color={"#ffffff"}
              />
              <Color
                dispatch={dispatch}
                handleColor={updateColor}
                currentColor={color.value}
                color={"#333333"}
              />
              <Color
                dispatch={dispatch}
                handleColor={updateColor}
                currentColor={color.value}
                color={"#d00000"}
              />
              <Color
                dispatch={dispatch}
                handleColor={updateColor}
                currentColor={color.value}
                color={"#4c956c"}
              />
              <Color
                dispatch={dispatch}
                handleColor={updateColor}
                currentColor={color.value}
                color={"#1982c4"}
              />
              <Color
                dispatch={dispatch}
                handleColor={updateColor}
                currentColor={color.value}
                color={"#9747FF"}
              />
            </div>
          </div>

          <div className="expense-btn-container">
            <button
              className="expenseBtn danger"
              type="button"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="expenseBtn action"
              disabled={updatedExpense.errors.length === 0 ? false : true}
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateExpense;
