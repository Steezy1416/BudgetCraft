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
      if (action.expense.withdrawalFrom.toLowerCase() === "personal") {
        return {
          ...budget,
          personalBalance: parseFloat(personalBalance - action.expenseAmmount),
          expenses: [...budget.expenses, action.expense],
          expensesTotal: parseFloat(
            (budget.expensesTotal + action.expenseAmmount).toFixed(2)
          ),
        };
      } else {
        return {
          ...budget,
          savings: parseFloat(savings - action.expenseAmmount),
          expenses: [...budget.expenses, action.expense],
          expensesTotal: parseFloat(
            (budget.expensesTotal + action.expenseAmmount).toFixed(2)
          ),
        };
      }
    }
    case "updateExpense": {
      const updatedExpense = action.expense;
      const updatedExpenses = budget.expenses.map((expense) => {
        if (expense.expenseName === updatedExpense.expenseName) {
          return updatedExpense;
        } else {
          return expense;
        }
      });

      let updatedExpenseTotal = 0;

      for (let i = 0; i < updatedExpenses.length; i++) {
        updatedExpenseTotal =
          parseFloat(updatedExpenses[i].currentAmmount) + updatedExpenseTotal;
      }

      return {
        ...budget,
        expenses: updatedExpenses,
        expensesTotal: updatedExpenseTotal,
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
      };
    }
    /* falls through */
    default: {
      return;
    }
  }
};
