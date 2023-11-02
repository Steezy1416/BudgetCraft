import { formatNumber } from "../utils/helper";

const HistoryModal = ({ selectedEntry, closeModal }) => {
  const {
    entryDate,
    entryType,
    entryMessage,
    entryNotes,
    entryAmmount,
    totalBalance,
    expensesTotal,
    personalBalance,
    savings,
    expenses,
    previousTotalBalance,
  } = selectedEntry;

  return (
    <div>
      <div>
        <p>{entryDate}</p>
        <i onClick={closeModal} className="fa-solid fa-xmark xmarkIcon"></i>
      </div>
      <h2>{entryMessage}</h2>
      <p>
        {entryType === "deposit" ? "+" : entryType === "withdrawal" ? "-" : ""}$
        {formatNumber(entryAmmount)}
      </p>
      <p>Personal Balance: ${formatNumber(personalBalance)}</p>
      <p>Savings: ${formatNumber(savings)}</p>
      {expenses.length > 0 && (
        <div>
          <p>Expenses:</p>
          {expenses.map((expense) => {
            return (
              <div>
                {expense.expenseName.value}: $
                {formatNumber(expense.currentAmmount.value)}
              </div>
            );
          })}
          <p>Expenses Total: ${formatNumber(expensesTotal)}</p>
        </div>
      )}
      {entryNotes && <p>Notes: {entryNotes}</p>}

      <p>Prev Balance: ${formatNumber(previousTotalBalance)}</p>
      <p>Available Balance: ${formatNumber(totalBalance)}</p>
    </div>
  );
};

export default HistoryModal;
