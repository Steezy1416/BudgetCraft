import { GetExpensesTotal, GetTotalBalance } from "../utils/helper";

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
    case "deposit": {
      if (action.category === "personal balance") {
        return {
          ...budget,
          totalBalance: GetTotalBalance(expensesTotal, action.ammount, savings),
          personalBalance: parseFloat(
            (action.ammount + personalBalance).toFixed(2)
          ),
        };
      } else if (action.category === "savings") {
        return {
          ...budget,
          totalBalance: GetTotalBalance(
            expensesTotal,
            personalBalance,
            action.ammount
          ),
          savings: parseFloat((action.ammount + savings).toFixed(2)),
        };
      }
    }
    /* falls through */
    case "withdrawal": {
      if (action.category === "personal balance") {
        return {
          ...budget,
          totalBalance: GetTotalBalance(expensesTotal, action.ammount, savings),
          personalBalance: parseFloat(
            (personalBalance - action.ammount).toFixed(2)
          ),
        };
      } else if (action.category === "savings") {
        return {
          ...budget,
          totalBalance: GetTotalBalance(
            expensesTotal,
            personalBalance,
            action.ammount
          ),
          savings: parseFloat((savings - action.ammount).toFixed(2)),
        };
      }
    }
    /* falls through */
    case "addExpense": {
      return {
        ...budget,
        expenses: [...budget.expenses, action.expense],
        expensesTotal: GetExpensesTotal([...budget.expenses, action.expense]),
      };
    }
    case "updateExpense": {
      console.log(action.prevExpense);
      const updatedExpense = action.expense;
      const updatedExpenses = budget.expenses.map((expense) => {
        if (expense.expenseName === updatedExpense.expenseName) {
          return updatedExpense;
        } else {
          return expense;
        }
      });

      return {
        ...budget,
        expenses: updatedExpenses,
        expensesTotal: GetExpensesTotal(updatedExpenses),
      };
    }

    case "deleteExpense": {
      const expenseToBeDeleted = action.expense;
      const updatedExpenses = budget.expenses.filter(
        (expense) => expense.expenseName !== expenseToBeDeleted.expenseName
      );
      return {
        ...budget,
        expenses: updatedExpenses,
        expensesTotal: GetExpensesTotal(updatedExpenses),
      };
    }
    /* falls through */
    default: {
      return;
    }
  }
};
