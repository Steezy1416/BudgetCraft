export const initialExpense = {
  expenseName: {
    value: "",
    errorMessage: "",
  },
  currentAmmount: {
    value: "",
    errorMessage: "",
  },
  maxAmmount: {
    value: "",
    errorMessage: "",
  },
  color: {
    value: "#ffffff",
  },
  errors: ["expenseName", "currentAmmount", "maxAmmount"],
};

export const expenseReducer = (state, action) => {
  switch (action.type) {
    case "changeExpenseName": {
      const expenses = action.expenses;
      let sameNameCount = expenses.filter(
        (expense) =>
          expense.expenseName.value.toLowerCase() === action.value.toLowerCase()
      );

      if (sameNameCount.length === 1) {
        return {
          ...state,
          expenseName: {
            value: action.value,
            errorMessage: "Name is taken",
          },
          errors: [...state.errors, "expenseName"],
        };
      }

      if (action.value === "") {
        return {
          ...state,
          expenseName: {
            value: "",
            errorMessage: "Please enter a expense name",
          },
          errors: [...state.errors, "expenseName"],
        };
      } else {
        return {
          ...state,
          expenseName: {
            value: action.value,
            errorMessage: "",
          },
          errors: state.errors.filter((error) => error !== "expenseName"),
        };
      }
    }
    case "changeCurrentAmmount": {
      const ammount = isNaN(parseFloat(action.value))
        ? ""
        : parseFloat(action.value);
      const totalBalance = action.totalBalance;
      const maxAmmount = 100000000;

      if (ammount > state.maxAmmount.value) {
        return {
          ...state,
          currentAmmount: {
            value: ammount,
            errorMessage: "",
          },
          errors: [...state.errors, "currentAmmount"],
        };
      }
      else if (ammount + totalBalance > maxAmmount) {
        return {
          ...state,
          currentAmmount: {
            value: state.currentAmmount.value,
            errorMessage: "Total Balance will exceed $100,000,000.00",
          },
          errors: [...state.errors, "currentAmmount"],
        };
      } else if (ammount === "") {
        return {
          ...state,
          currentAmmount: {
            value: ammount,
            errorMessage: "Please enter an ammount",
          },
          errors: [...state.errors, "currentAmmount"],
        };
      } else if (ammount < 0) {
        return {
          ...state,
          currentAmmount: {
            value: ammount,
            errorMessage: "Ammount must be 0 or greater",
          },
          errors: [...state.errors, "currentAmmount"],
        };
      } else {
        return {
          ...state,
          currentAmmount: {
            value: ammount,
            errorMessage: "",
          },
          errors: state.errors.filter((error) => error !== "currentAmmount"),
        };
      }
    }
    case "changeMaxAmmount": {
      const ammount = isNaN(parseFloat(action.value))
        ? ""
        : parseFloat(action.value);
      const totalBalance = action.totalBalance;

      const maxAmmount = 100000000;

      if (ammount < state.currentAmmount.value) {
        return {
          ...state,
          maxAmmount: {
            value: ammount,
            errorMessage: "Max Ammount cannot be less than current ammount",
          },
          errors: [...state.errors, "maxAmmount"],
        };
      } else if (ammount + totalBalance > maxAmmount) {
        return {
          ...state,
          maxAmmount: {
            value: state.maxAmmount.value,
            errorMessage: "Total Balance will exceed $100,000,000.00",
          },
          errors: [...state.errors, "maxAmmount"],
        };
      } else if (ammount === "") {
        return {
          ...state,
          maxAmmount: {
            value: ammount,
            errorMessage: "Please enter an ammount",
          },
          errors: [...state.errors, "maxAmmount"],
        };
      } else if (ammount <= 0) {
        return {
          ...state,
          maxAmmount: {
            value: ammount,
            errorMessage: "Ammount must be greater than 0",
          },
          errors: [...state.errors, "maxAmmount"],
        };
      } else {
        return {
          ...state,
          maxAmmount: {
            value: ammount,
            errorMessage: "",
          },
          errors: state.errors.filter((error) => error !== "maxAmmount"),
        };
      }
    }
    case "changeColor": {
      return {
        ...state,
        color: {
          value: action.value,
        },
      };
    }
    default: {
      return initialExpense;
    }
  }
};
