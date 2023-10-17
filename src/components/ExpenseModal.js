import { useReducer, useState } from "react";
import { formatNumber } from "../utils/helper";
import { expenseReducer, initialExpense } from "../reducers/expenseReducer";
import { useBudget, useBudgetDispatch } from "../BudgetContext";

const ExpenseModal = ({ modalState, setModalState }) => {
  const budgetContextData = useBudget();
  const budgetContextDispatch = useBudgetDispatch();
  const [expenseForm, dispatch] = useReducer(expenseReducer, initialExpense);
  const closeModal = () => setModalState({ ...modalState, isModalOpen: false });

  switch (modalState.modalPurpose) {
    case "create": {
      return (
        <CreateExpense
          expenseForm={expenseForm}
          dispatch={dispatch}
          setModalState={setModalState}
          modalState={modalState}
          budgetContextDispatch={budgetContextDispatch}
          budgetContextData={budgetContextData}
          closeModal={closeModal}
        />
      );
    }
    case "summary": {
      return (
        <ExpenseSummary
          setModalState={setModalState}
          modalState={modalState}
          budgetContextDispatch={budgetContextDispatch}
          closeModal={closeModal}
        />
      );
    }
    case "update": {
      return (
        <UpdateExpense
          modalState={modalState}
          budgetContextData={budgetContextData}
          budgetContextDispatch={budgetContextDispatch}
          closeModal={closeModal}
        />
      );
    }
    default: {
      return;
    }
  }
};

const CreateExpense = ({
  expenseForm,
  dispatch,
  setModalState,
  modalState,
  budgetContextDispatch,
  budgetContextData,
  closeModal,
}) => {

  const handleExpenseName = (e) => {
    dispatch({
      type: "changeExpenseName",
      value: e.target.value,
    });
  };

  const handleCurrentAmmount = (e) => {
    dispatch({
      type: "changeCurrentAmmount",
      value: e.target.value,
    });
  };

  const handleMaxAmmount = (e) => {
    dispatch({
      type: "changeMaxAmmount",
      value: e.target.value,
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
      expenseAmmount: parseFloat(expenseForm.currentAmmount),
    });
    setModalState({
      ...modalState,
      modalData: expenseForm,
    });
  };

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
          <label>
            Name:
            <input onChange={handleExpenseName} type="text" />
          </label>

          <label>
            Current Ammount: $
            <input
              onChange={handleCurrentAmmount}
              type="number"
              step="any"
              inputMode="numeric"
            />
          </label>

          <label>
            Max Ammount: $
            <input
              onChange={handleMaxAmmount}
              type="number"
              step="any"
              inputMode="numeric"
            />
          </label>

          <label>
            Color:
            <input onChange={handleColor} type="color" />
          </label>

          <div>
            <button type="button" onClick={closeModal}>
              Cancel
            </button>
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const UpdateExpense = ({
  modalState,
  budgetContextData,
  budgetContextDispatch,
  closeModal,
}) => {
  const { expenseName, currentAmmount, maxAmmount, color } =
    modalState.modalData;

  const [updatedExpense, setUpdatedExpense] = useState(modalState.modalData);

  const updateCurrentAmmount = (e) => {
    setUpdatedExpense({
      ...updatedExpense,
      currentAmmount: parseFloat(e.target.value),
    });
  };

  const updateMaxAmmount = (e) => {
    setUpdatedExpense({
      ...updatedExpense,
      maxAmmount: parseFloat(e.target.value),
    });
  };

  const updateColor = (e) => {
    setUpdatedExpense({
      ...updatedExpense,
      color: e.target.value,
    });
  };

  const handleExpenseUpdate = (e) => {
    e.preventDefault();

    budgetContextDispatch({
      type: "updateExpense",
      expense: updatedExpense,
      prevExpense: modalState.modalData,
    });
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

          <p>Name: {expenseName}</p>

          <label>
            Current Ammount: $
            <input
              defaultValue={currentAmmount}
              onChange={updateCurrentAmmount}
              type="number"
              step="any"
              inputMode="numeric"
            />
          </label>

          <label>
            Max Ammount: $
            <input
              defaultValue={maxAmmount}
              onChange={updateMaxAmmount}
              type="number"
              step="any"
              inputMode="numeric"
            />
          </label>

          <label>
            Color:
            <input defaultValue={color} onChange={updateColor} type="color" />
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
          <p>Name: {expenseName}</p>
          <p>Current Ammount: ${formatNumber(currentAmmount)}</p>
          <p>Max Ammount: ${formatNumber(maxAmmount)}</p>
          <p>Color: {color}</p>
        </div>
        <div>
          <button onClick={deleteExpense}>Delete</button>
          <button onClick={handleUpdateClick}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseModal;
