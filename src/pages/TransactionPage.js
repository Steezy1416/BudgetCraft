import { useReducer } from "react";
import { initialForm, formReducer } from "../reducers/transactionPageReducer";

const TransactionPage = () => {
  const [form, dispatch] = useReducer(formReducer, initialForm);

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
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div onChange={hanleTransactionTypeChange}>
        <p>Transaction Type</p>
        {form.transactionType.errorMessage && (
          <p>{form.transactionType.errorMessage}</p>
        )}
        <label>
          Deposit
          <input
            type="radio"
            name="transactionType"
            required
            value={"deposit"}
          />
        </label>
        <label>
          Withdrawal
          <input type="radio" name="transactionType" value={"withrawal"} />
        </label>
      </div>

      <div onChange={handleCategoryChange}>
        <p>Category</p>
        {form.categoryType.errorMessage && (
          <p>{form.categoryType.errorMessage}</p>
        )}
        <label>
          Personal Balance
          <input
            type="radio"
            name="category"
            required
            value={"personalBalance"}
          />
        </label>
        <label>
          Savings
          <input type="radio" name="category" value={"savings"} />
        </label>
      </div>

      <div>
        {form.ammount.errorMessage && <p>{form.ammount.errorMessage}</p>}
        <label>
          Ammount
          <br />
          $
          <input
            required
            name="ammount"
            type="number"
            value={parseFloat(form.ammount.value) || ""}
            step="any"
            min="0"
            max="10000000.00"
            inputMode="numeric"
            placeholder="Enter ammount"
            onChange={handleAmmountChange}
          />
        </label>
        {form.memo.errorMessage && <p>{form.memo.errorMessage}</p>}
        <label>
          Memo
          <input
            name="memo"
            required
            minLength="1"
            maxLength="100"
            placeholder="Enter memo"
            onChange={handleMemoChange}
          />
        </label>
        {form.memo.charactersLeft && <p>{form.memo.charactersLeft}</p>}
      </div>

      <input
        disabled={form.errors.length === 0 ? false : true}
        type="submit"
        value={"Complete"}
      />
    </form>
  );
};

export default TransactionPage;
