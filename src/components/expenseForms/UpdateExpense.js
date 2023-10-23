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
  };

  const updateMaxAmmount = (e) => {
    dispatch({
      type: "changeMaxAmmount",
      value: e.target.value,
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
        style={{ backgroundColor: `${color.value}` }}
        className="expenseModal"
      >
        <div className="expenseModalHeader">
          <h2>Update Expense</h2>
        </div>
        <div className="badge-container">
          <div className="expenseBadge personalBadge">
            <p>Personal:</p>
            <p>${formatNumber(budgetContextData.personalBalance)}</p>
          </div>
          <div className="expenseBadge savingsBadge">
            <p>Savings:</p>
            <p>${formatNumber(budgetContextData.savings)}</p>
          </div>
        </div>
        <form className="expense-form" onSubmit={handleExpenseUpdate}>
          <p>Name: {expenseName.value}</p>

          {currentAmmount.errorMessage && <p>{currentAmmount.errorMessage}</p>}
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

          {maxAmmount.errorMessage && <p>{maxAmmount.errorMessage}</p>}
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
                color={"#EE1E5F"}
              />
              <Color
                dispatch={dispatch}
                handleColor={updateColor}
                currentColor={color.value}
                color={"#FFC727"}
              />
              <Color
                dispatch={dispatch}
                handleColor={updateColor}
                currentColor={color.value}
                color={"#1DE98B"}
              />
              <Color
                dispatch={dispatch}
                handleColor={updateColor}
                currentColor={color.value}
                color={"#9747FF"}
              />
              <Color
                dispatch={dispatch}
                handleColor={updateColor}
                currentColor={color.value}
                color={"#0091EA"}
              />
            </div>
          </div>

          <div className="expense-btn-container">
            <button className="expenseBtn" type="button" onClick={closeModal}>
              Cancel
            </button>
            <button className="expenseBtn" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateExpense;
