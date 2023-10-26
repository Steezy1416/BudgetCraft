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
  const { totalBalance, expensesTotal, savings, personalBalance, history } =
    budget;

  switch (action.type) {
    case "deposit": {
      if (action.category === "personal balance") {
        return {
          ...budget,
          totalBalance: GetTotalBalance(
            expensesTotal,
            parseFloat((action.ammount + personalBalance).toFixed(2)),
            savings
          ),
          personalBalance: parseFloat(
            (action.ammount + personalBalance).toFixed(2)
          ),
          history: [
            ...history,
            {
              entryDate: new Date().toLocaleDateString() ,
              entryType: "deposit",
              entryMessage: "Personal Deposit",
              entryNotes: action.notes,
              entryAmmount: action.ammount,
              totalBalance: GetTotalBalance(
                expensesTotal,
                parseFloat((action.ammount + personalBalance).toFixed(2)),
                savings
              ),
              expensesTotal: expensesTotal,
              personalBalance: parseFloat(
                (action.ammount + personalBalance).toFixed(2)
              ),
              savings: savings,
              expenses: [...budget.expenses],
              previousTotalBalance: totalBalance,
            },
          ],
        };
      } else if (action.category === "savings") {
        return {
          ...budget,
          totalBalance: GetTotalBalance(
            expensesTotal,
            personalBalance,
            parseFloat((action.ammount + savings).toFixed(2))
          ),
          savings: parseFloat((action.ammount + savings).toFixed(2)),
          history: [
            ...history,
            {
              entryDate: new Date().toLocaleDateString() ,
              entryType: "deposit",
              entryMessage: "Savings Deposit",
              entryNotes: action.notes,
              entryAmmount: action.ammount,
              totalBalance: GetTotalBalance(
                expensesTotal,
                personalBalance,
                parseFloat((action.ammount + savings).toFixed(2))
              ),
              expensesTotal: expensesTotal,
              personalBalance: personalBalance,
              savings: parseFloat((action.ammount + savings).toFixed(2)),
              expenses: [...budget.expenses],
              previousTotalBalance: totalBalance,
            },
          ],
        };
      }
    }
    /* falls through */
    case "withdrawal": {
      if (action.category === "personal balance") {
        return {
          ...budget,
          totalBalance: GetTotalBalance(
            expensesTotal,
            parseFloat((personalBalance - action.ammount).toFixed(2)),
            savings
          ),
          personalBalance: parseFloat(
            (personalBalance - action.ammount).toFixed(2)
          ),
          history: [
            ...history,
            {
              entryDate: new Date().toLocaleDateString() ,
              entryType: "withdrawal",
              entryMessage: "Personal Withdrawal",
              entryNotes: action.notes,
              entryAmmount: action.ammount,
              totalBalance: GetTotalBalance(
                expensesTotal,
                parseFloat((personalBalance - action.ammount).toFixed(2)),
                savings
              ),
              expensesTotal: expensesTotal,
              personalBalance: parseFloat(
                (personalBalance - action.ammount).toFixed(2)
              ),
              savings: savings,
              expenses: [...budget.expenses],
              previousTotalBalance: totalBalance,
            },
          ],
        };
      } else if (action.category === "savings") {
        return {
          ...budget,
          totalBalance: GetTotalBalance(
            expensesTotal,
            personalBalance,
            parseFloat((savings - action.ammount).toFixed(2))
          ),
          savings: parseFloat((savings - action.ammount).toFixed(2)),
          history: [
            ...history,
            {
              entryDate: new Date().toLocaleDateString() ,
              entryType: "withdrawal",
              entryMessage: "Savings Withdrawal",
              entryNotes: action.notes,
              entryAmmount: action.ammount,
              totalBalance: GetTotalBalance(
                expensesTotal,
                personalBalance,
                parseFloat((savings - action.ammount).toFixed(2))
              ),
              expensesTotal: expensesTotal,
              personalBalance: personalBalance,
              savings: parseFloat((savings - action.ammount).toFixed(2)),
              expenses: [...budget.expenses],
              previousTotalBalance: totalBalance,
            },
          ],
        };
      }
    }
    /* falls through */
    case "addExpense": {
      return {
        ...budget,
        totalBalance: GetTotalBalance(
          GetExpensesTotal([...budget.expenses, action.expense]),
          personalBalance,
          savings
        ),
        expenses: [...budget.expenses, action.expense],
        expensesTotal: GetExpensesTotal([...budget.expenses, action.expense]),
        history: [
          ...history,
          {
            entryDate: new Date().toLocaleDateString() ,
            entryType: "expense",
            entryMessage: `Created ${action.expense.expenseName.value} Expense`,
            entryAmmount: action.expense.currentAmmount.value,
            totalBalance: GetTotalBalance(
              GetExpensesTotal([...budget.expenses, action.expense]),
              personalBalance,
              savings
            ),
            expensesTotal: GetExpensesTotal([
              ...budget.expenses,
              action.expense,
            ]),
            personalBalance: personalBalance,
            savings: savings,
            expenses: [...budget.expenses, action.expense],
            previousTotalBalance: totalBalance,
          },
        ],
      };
    }
    case "updateExpense": {
      const updatedExpense = action.expense;
      const updatedExpenses = budget.expenses.map((expense) => {
        if (expense.expenseName.value === updatedExpense.expenseName.value) {
          return updatedExpense;
        } else {
          return expense;
        }
      });

      return {
        ...budget,
        totalBalance: GetTotalBalance(
          GetExpensesTotal(updatedExpenses),
          personalBalance,
          savings
        ),
        expenses: updatedExpenses,
        expensesTotal: GetExpensesTotal(updatedExpenses),
        history: [
          ...history,
          {
            entryDate: new Date().toLocaleDateString() ,
            entryType: "expense",
            entryMessage: `Updated ${action.expense.expenseName.value} Expense`,
            entryAmmount: updatedExpense.currentAmmount.value,
            totalBalance: GetTotalBalance(
              GetExpensesTotal(updatedExpenses),
              personalBalance,
              savings
            ),
            expensesTotal: GetExpensesTotal(updatedExpenses),
            personalBalance: personalBalance,
            savings: savings,
            expenses: updatedExpenses,
            previousTotalBalance: totalBalance,
          },
        ],
      };
    }

    case "deleteExpense": {
      const expenseToBeDeleted = action.expense;
      const updatedExpenses = budget.expenses.filter(
        (expense) =>
          expense.expenseName.value !== expenseToBeDeleted.expenseName.value
      );
      return {
        ...budget,
        expenses: updatedExpenses,
        expensesTotal: GetExpensesTotal(updatedExpenses),
        history: [
          ...history,
          {
            entryDate: new Date().toLocaleDateString() ,
            entryType: "expense",
            entryMessage: `Deleted ${action.expense.expenseName.value} Expense`,
            entryAmmount: expenseToBeDeleted.currentAmmount.value,
            totalBalance: GetTotalBalance(
              GetExpensesTotal(updatedExpenses),
              personalBalance,
              savings
            ),
            expensesTotal: GetExpensesTotal(updatedExpenses),
            personalBalance: personalBalance,
            savings: savings,
            expenses: updatedExpenses,
            previousTotalBalance: totalBalance,
          },
        ],
      };
    }
    /* falls through */
    default: {
      return;
    }
  }
};
