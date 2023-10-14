export const initialForm = {
  transactionType: {
    value: "",
  },
  categoryType: {
    value: "",
  },
  ammount: {
    value: "",
    errorMessage: "",
  },
  memo: {
    value: "",
    charactersLeft: "",
  },
  errors: ["transactionTypeError", "categoryTypeError", "ammountError"],
};

export const formReducer = (state, action) => {
  switch (action.type) {
    case "selectTransactionType": {
      return {
        ...state,
        transactionType: {
          value: action.value,
        },
        errors: state.errors.filter(
          (error) => error !== "transactionTypeError"
        ),
      };
    }
    case "selectCategoryType": {
      return {
        ...state,
        categoryType: {
          value: action.value,
        },
        errors: state.errors.filter((error) => error !== "categoryTypeError"),
      };
    }
    case "ammountChange": {
      const ammount = isNaN(parseFloat(action.value))
        ? ""
        : parseFloat(action.value);
      const totalBalance = action.totalBalance;
      const maxAmmount = 100000000;
      if (ammount + totalBalance > maxAmmount) {
        return {
          ...state,
          ammount: {
            value: state.ammount.value,
            errorMessage: "Too rich, total balance cant exceed $100,000,000.00",
          },
          errors: state.errors.filter((error) => error !== "ammountError"),
        };
      } else if (ammount === "") {
        return {
          ...state,
          ammount: {
            value: ammount,
            errorMessage: "Please enter an ammount",
          },
          errors: [...state.errors, "ammountError"],
        };
      } else if (ammount <= 0) {
        return {
          ...state,
          ammount: {
            value: ammount,
            errorMessage: "Ammount must be greater than 0",
          },
          errors: [...state.errors, "ammountError"],
        };
      } else {
        return {
          ...state,
          ammount: {
            value: ammount,
            errorMessage: "",
          },
          errors: state.errors.filter((error) => error !== "ammountError"),
        };
      }
    }
    case "memoChange": {
      const memo = action.value;
      const memoLength = memo.length;
      if (memo[0] === " ") {
        return {
          ...state,
          memo: {
            value: "",
            charactersLeft: "100",
          },
        };
      } else if (memo[memoLength - 2] === " " && memo[memoLength - 1] === " ") {
        return {
          ...state,
          memo: {
            value: state.memo.value,
            charactersLeft: state.memo.charactersLeft,
          },
        };
      } else {
        return {
          ...state,
          memo: {
            value: memo,
            charactersLeft: (100 - memoLength).toString(),
          },
        };
      }
    }
    case "resetForm": {
      return initialForm;
    }
    default: {
    }
  }
};
