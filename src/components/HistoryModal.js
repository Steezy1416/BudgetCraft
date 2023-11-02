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
        {entryAmmount}
      </p>
      <p>Personal Balance: ${personalBalance}</p>
      <p>Savings: ${savings}</p>
      {expenses.length > 0 && (
        <div>
          <p>Expenses:</p>
          {expenses.map((expense) => {
            return (
              <div>
                {expense.expenseName.value}: ${expense.currentAmmount.value}
              </div>
            );
          })}
          <p>Expenses Total: ${expensesTotal}</p>
        </div>
      )}
      {entryNotes && <p>Notes: {entryNotes}</p>}

      <p>Prev Balance: ${previousTotalBalance}</p>
      <p>Available Balance: ${totalBalance}</p>
    </div>
  );
};

export default HistoryModal;
