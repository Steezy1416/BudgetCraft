import { useReducer } from "react";
import { expenseReducer, initialExpense } from "../reducers/expenseReducer";
import { useBudget, useBudgetDispatch } from "../BudgetContext";
import CreateExpense from "./expenseForms/CreateExpense";
import ExpenseSummary from "./expenseForms/ExpenseSummary";
import UpdateExpense from "./expenseForms/UpdateExpense";

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

export default ExpenseModal;
