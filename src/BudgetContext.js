import { createContext, useContext, useReducer } from "react";
import {
  budgetReducer,
  initialBudgetContext,
} from "./reducers/budgetContextReducer";

const BudgetContext = createContext(null);
const BudgetDispatchContext = createContext(null);

export const BudgetProvider = ({ children }) => {
  const [budget, dispatch] = useReducer(budgetReducer, initialBudgetContext);

  return (
    <BudgetContext.Provider value={budget}>
      <BudgetDispatchContext.Provider value={dispatch}>
        {children}
      </BudgetDispatchContext.Provider>
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  return useContext(BudgetContext);
};

export const useBudgetDispatch = () => {
  return useContext(BudgetDispatchContext);
};
