import { useReducer } from "react";
import { initialForm, formReducer } from "../reducers/transactionPageReducer";

const TransactionPage = () => {
  const [form, dispatch] = useReducer(formReducer, initialForm);

  const hanleTransactionTypeChange = (e) => {
    console.log(e.target.value)
    dispatch({
      type: "selectTransactionType",
      value: e.target.value,
    });
  };

  const handleCategoryChange = (e) => {
    console.log(e.target.value)
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
    <div className="transactionPageContainer">
      <form className="transactionPageForm" onSubmit={handleSubmit}>
        <div className="form-section" onChange={hanleTransactionTypeChange}>
          <p>Transaction Type</p>
          {form.transactionType.errorMessage && (
            <p className="form-error-msg">{form.transactionType.errorMessage}</p>
          )}
          <label className="radio-btn">
            Deposit
            <input
              type="radio"
              name="transactionType"
              required
              value={"deposit"}
            />
            <div className={`radio-circle ${form.transactionType.value === "deposit" && "active-radio-circle"}`}></div>
          </label>
          <label className="radio-btn">
            Withdrawal
            <input type="radio" name="transactionType" value={"withdrawal"} />
            <div className={`radio-circle ${form.transactionType.value === "withdrawal" && "active-radio-circle"}`}></div>
          </label>
        </div>

        <div className="form-section" onChange={handleCategoryChange}>
          <p>Category</p>
          {form.categoryType.errorMessage && (
            <p className="form-error-msg">{form.categoryType.errorMessage}</p>
          )}
          <label className="radio-btn">
            Personal Balance
            <input
              type="radio"
              name="category"
              required
              value={"personalBalance"}
            />
            <div className={`radio-circle ${form.categoryType.value === "personalBalance" && "active-radio-circle"}`}/>
          </label>
          <label className="radio-btn">
            Savings
            <input type="radio" name="category" value={"savings"} />
            <div className={`radio-circle ${form.categoryType.value === "savings" && "active-radio-circle"}`}></div>
          </label>
        </div>

        <div className="form-section">
          {form.ammount.errorMessage && <p className="form-error-msg">{form.ammount.errorMessage}</p>}
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
          {form.memo.errorMessage && <p className="form-error-msg">{form.memo.errorMessage}</p>}
          <label>
            Memo
            <br />
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
    </div>
  );
};

export default TransactionPage;
