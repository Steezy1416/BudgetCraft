import { useReducer } from "react";
import { initialForm, formReducer } from "../reducers/transactionPageReducer";
import OptionSelector from "../components/OptionSelector";
import {useBudgetDispatch } from "../BudgetContext";

const TransactionPage = () => {
  const budgetDispatch = useBudgetDispatch();

  const [form, dispatch] = useReducer(formReducer, initialForm);

  const { transactionType, categoryType, ammount, memo, errors } = form;

  const hanleTransactionTypeChange = (e) => {
    dispatch({
      type: "selectTransactionType",
      value: e.target.value,
    });
  };

  const handleCategoryChange = (e) => {
    dispatch({
      type: "selectCategoryType",
      value: e.target.value,
    });
  };

  const handleAmmountChange = (e) => {
    dispatch({
      type: "ammountChange",
      value: e.target.value,
    });
  };

  const handleMemoChange = (e) => {
    dispatch({
      type: "memoChange",
      value: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);

    budgetDispatch({
      type: transactionType.value,
      category: categoryType.value,
      ammount: parseFloat(ammount.value) 
    })

    dispatch({
      type: "resetForm",
    });
  };

  return (
    <div className="transactionPageContainer">
      <form className="transactionPageForm" onSubmit={handleSubmit}>
        <OptionSelector
          options={["Deposit", "Withdrawal"]}
          handlerFunction={hanleTransactionTypeChange}
          formData={transactionType}
          errorMessage={transactionType.errorMessage}
        >
          Transaction Type
        </OptionSelector>

        <OptionSelector
          options={["Personal Balance", "Savings"]}
          handlerFunction={handleCategoryChange}
          formData={categoryType}
          errorMessage={categoryType.errorMessage}
        >
          Category Type
        </OptionSelector>

        <div className="form-section">
          {ammount.errorMessage && (
            <p className="form-error-msg">{ammount.errorMessage}</p>
          )}
          <label className="ammount-input">
            Ammount
            <div className="ammount-sub-input">
              $
              <input
                required
                className="ammount-input-box"
                name="ammount"
                type="number"
                value={parseFloat(form.ammount.value) || ""}
                step="any"
                min="0"
                max="10000000.00"
                inputMode="numeric"
                placeholder="Enter ammount..."
                onChange={handleAmmountChange}
              />
            </div>
          </label>
          {memo.errorMessage && (
            <p className="form-error-msg">{memo.errorMessage}</p>
          )}
          <label className="memo-input">
            Memo
            <textarea
              className="memo-textarea"
              name="memo"
              required
              minLength="1"
              maxLength="100"
              placeholder="Enter memo..."
              value={memo.value}
              onChange={handleMemoChange}
            />
          </label>
          {memo.charactersLeft && <p>{memo.charactersLeft}</p>}
        </div>

        <input
          className="form-btn"
          disabled={errors.length === 0 ? false : true}
          type="submit"
          value={"Complete"}
        />
      </form>
    </div>
  );
};

export default TransactionPage;
