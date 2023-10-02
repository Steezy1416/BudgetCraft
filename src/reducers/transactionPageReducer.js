export const initialForm = {
  transactionType: {
    value: "",
    errorMessage: "Please select an option",
  },
  categoryType: {
    value: "",
    errorMessage: "Please select an option",
  },
  ammount: {
    value: "",
    errorMessage: "Please enter a ammount",
  },
  memo: {
    value: "",
    errorMessage: "Please enter a memo",
    charactersLeft: "",
  },
  errors: [
    "transactionTypeError",
    "categoryTypeError",
    "ammountError",
    "memoError",
  ],
};

export const formReducer = (state, action) => {
  switch (action.type) {
    case "selectTransactionType": {
      return {
        ...state,
        transactionType: {
          value: action.value,
          errorMessage: "",
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
          errorMessage: "",
        },
        errors: state.errors.filter((error) => error !== "categoryTypeError"),
      };
    }
    case "ammountChange": {
      const ammount = parseFloat(action.value);
      console.log(ammount);
      if (ammount > 10000000.0) {
        return {
          ...state,
          ammount: {
            value: state.ammount.value.toString(),
            errorMessage: "Ammount must be less than 100000.00",
          },
          errors: [...state.errors, "ammountError"],
        };
      } else if (!ammount) {
        return {
          ...state,
          ammount: {
            value: "",
            errorMessage: "Please enter an ammount",
          },
          errors: [...state.errors, "ammountError"],
        };
      } else if (ammount <= 0) {
        return {
          ...state,
          ammount: {
            value: state.ammount.value.toString(),
            errorMessage: "Ammount must be greater than 0",
          },
          errors: [...state.errors, "ammountError"],
        };
      } else {
        return {
          ...state,
          ammount: {
            value: ammount.toString(),
            errorMessage: "",
          },
          errors: state.errors.filter((error) => error !== "ammountError"),
        };
      }
    }
    case "memoChange": {
      const memo = action.value;
      const memoLenght = memo.length;
      if (memoLenght === 0) {
        return {
          ...state,
          memo: {
            value: "",
            errorMessage: "Please enter a memo",
            charactersLeft: `You have ${100 - memoLenght} characters left`,
          },
          errors: [...state.errors, "memoError"],
        };
      } else {
        return {
          ...state,
          memo: {
            value: memo,
            errorMessage: "",
            charactersLeft: `You have ${100 - memoLenght} characters left`,
          },
          errors: state.errors.filter((error) => error !== "memoError"),
        };
      }
    }
    default: {
    }
  }
};
