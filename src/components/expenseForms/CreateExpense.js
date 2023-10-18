import { formatNumber } from "../../utils/helper";

const CreateExpense = ({
  expenseForm,
  dispatch,
  modalState,
  budgetContextDispatch,
  budgetContextData,
  closeModal,
}) => {
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

  const handleColor = (e) => {
    dispatch({
      type: "changeColor",
      value: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    budgetContextDispatch({
      type: "addExpense",
      expense: expenseForm,
    });
    dispatch({
      type: "resetForm",
    });
    closeModal();
  };

  const { expenseName, currentAmmount, maxAmmount, color } = expenseForm;

  return (
    <div style={{ display: modalState.isModalOpen ? "block" : "none" }}>
      <div className="modal">
        <h2>Create Expense</h2>
        <div className="badge-container">
          <div>
            <p>Personal: ${formatNumber(budgetContextData.personalBalance)}</p>
          </div>
          <div>
            <p>Savings: ${formatNumber(budgetContextData.savings)}</p>
          </div>
        </div>
        <form className="expense-form" onSubmit={handleSubmit}>
          {expenseName.errorMessage && <p>{expenseName.errorMessage}</p>}
          <label>
            Name:
            <input
              required
              onChange={handleExpenseName}
              value={expenseName.value}
              type="text"
            />
          </label>

          {currentAmmount.errorMessage && <p>{currentAmmount.errorMessage}</p>}
          <label>
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

          {maxAmmount.errorMessage && <p>{maxAmmount.errorMessage}</p>}
          <label>
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

          <label>
            Color:
            <input onChange={handleColor} value={color.value} type="color" />
          </label>

          <div>
            <button type="button" onClick={closeModal}>
              Cancel
            </button>
            <button
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
