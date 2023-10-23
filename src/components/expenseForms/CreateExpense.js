import { formatNumber } from "../../utils/helper";
import Color from "../ColorInput";

const CreateExpense = ({
  expenseForm,
  dispatch,
  modalState,
  budgetContextDispatch,
  budgetContextData,
  closeModal,
}) => {
  const { expenseName, currentAmmount, maxAmmount, color } = expenseForm;

  const handleExpenseName = (e) => {
    dispatch({
      type: "changeExpenseName",
      value: e.target.value,
      expenses: budgetContextData.expenses,
    });
  };

  const handleCurrentAmmount = (e) => {
    dispatch({
      type: "changeCurrentAmmount",
      value: e.target.value,
      totalBalance: budgetContextData.totalBalance,
    });
  };

  const handleMaxAmmount = (e) => {
    dispatch({
      type: "changeMaxAmmount",
      value: e.target.value,
      totalBalance: budgetContextData.totalBalance,
    });
    dispatch({
      type: "changeCurrentAmmount",
      value: expenseForm.currentAmmount.value,
      totalBalance: budgetContextData.totalBalance,
    });
  };

  const handleColor = (color) => {
    dispatch({
      type: "changeColor",
      value: color,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    budgetContextDispatch({
      type: "addExpense",
      expense: expenseForm,
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
          <h2>Create Expense</h2>
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
        <form className="expense-form" onSubmit={handleSubmit}>
          {expenseName.errorMessage && (
            <p className="form-error-msg">{expenseName.errorMessage}</p>
          )}
          <label className="expenseLabel">
            Name:
            <input
              required
              onChange={handleExpenseName}
              value={expenseName.value}
              type="text"
            />
          </label>

          {currentAmmount.errorMessage && (
            <p className="form-error-msg">{currentAmmount.errorMessage}</p>
          )}
          <label className="expenseLabel">
            Current Ammount: $
            <input
              onChange={handleCurrentAmmount}
              type="number"
              step="any"
              required
              value={currentAmmount.value}
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
              onChange={handleMaxAmmount}
              type="number"
              step="any"
              required
              value={maxAmmount.value}
              onWheel={(e) => e.currentTarget.blur()}
              inputMode="numeric"
            />
          </label>

          <div className="colorLabel">
            <p>Color:</p>
            <div className="expenseColorContainer">
              <Color
                dispatch={dispatch}
                handleColor={handleColor}
                currentColor={color.value}
                color={"#ffffff"}
              />
              <Color
                dispatch={dispatch}
                handleColor={handleColor}
                currentColor={color.value}
                color={"#EE1E5F"}
              />
              <Color
                dispatch={dispatch}
                handleColor={handleColor}
                currentColor={color.value}
                color={"#FFC727"}
              />
              <Color
                dispatch={dispatch}
                handleColor={handleColor}
                currentColor={color.value}
                color={"#1DE98B"}
              />
              <Color
                dispatch={dispatch}
                handleColor={handleColor}
                currentColor={color.value}
                color={"#9747FF"}
              />
              <Color
                dispatch={dispatch}
                handleColor={handleColor}
                currentColor={color.value}
                color={"#0091EA"}
              />
            </div>
          </div>

          <div className="expense-btn-container">
            <button className="expenseBtn" type="button" onClick={closeModal}>
              Cancel
            </button>
            <button
              className="expenseBtn"
              disabled={expenseForm.errors.length === 0 ? false : true}
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExpense;
