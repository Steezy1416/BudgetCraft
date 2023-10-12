import { GetTotalBalance } from "../utils/helper";

const emptyBudget = {
  totalBalance: 0,
  expensesTotal: 0,
  personalBalance: 0,
  savings: 0,
  expenses: [],
  history: [],
};

export const initialBudgetContext =
  JSON.parse(localStorage.getItem("budgetContext")) || emptyBudget;

export const budgetReducer = (budget, action) => {
  const { expensesTotal, savings, personalBalance } = budget;

  switch (action.type) {
    case "Deposit": {
      if (action.category === "Personal Balance") {
        return {
          ...budget,
          totalBalance: GetTotalBalance(expensesTotal, action.ammount, savings),
          personalBalance: parseFloat((action.ammount + personalBalance).toFixed(2)),
        };
      } else if (action.category === "Savings") {
        return {
          ...budget,
          totalBalance: GetTotalBalance(expensesTotal, personalBalance, action.ammount),
          savings: parseFloat((action.ammount + savings).toFixed(2)),
        };
      }
    }
    /* falls through */
    case "Withdrawal": {
      if (action.category === "Personal Balance") {
        return {
          ...budget,
          totalBalance: GetTotalBalance(expensesTotal, action.ammount, savings),
          personalBalance: parseFloat((personalBalance - action.ammount).toFixed(2)),
        };
      } else if (action.category === "Savings") {
        return {
          ...budget,
          totalBalance: GetTotalBalance(expensesTotal, personalBalance, action.ammount),
          savings: parseFloat((savings - action.ammount).toFixed(2)),
        };
      }
    }
    /* falls through */
    case "addExpense": {
      return {
        ...budget,
        expenses: [...budget.expenses, action.expense],
        expensesTotal: parseFloat((budget.expensesTotal + action.expenseAmmount).toFixed(2))
      }

    }
    /* falls through */
    default: {
      return;
    }
  }
};
