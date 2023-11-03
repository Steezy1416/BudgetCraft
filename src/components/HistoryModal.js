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

  let entryColor = () => {
    switch (entryType) {
      case "deposit": {
        return "#38b000";
      }
      case "withdrawal": {
        return "rgb(208, 0, 0)";
      }
      case "expense": {
        return "rgb(151, 71, 255)";
      }
      default: {
        return;
      }
    }
  };

  return (
    <div className="historyModalContainer">
      <div className="historyModalHeader">
        <p>{entryDate}</p>
        <i onClick={closeModal} className="fa-solid fa-xmark xmarkIcon"></i>
      </div>
      <div className="historyModalTitle">
        <h2>{entryMessage}</h2>
        <p style={{color: entryColor()}}>
          {entryType === "deposit"
            ? "+"
            : entryType === "withdrawal"
            ? "-"
            : ""}
          ${formatNumber(entryAmmount)}
        </p>
      </div>
      <div className="historyModalInformation">
        <p><span className="bold">Personal Balance:</span> ${formatNumber(personalBalance)}</p>
        <p><span className="bold">Savings:</span> ${formatNumber(savings)}</p>
        {expenses.length > 0 && (
          <div>
            <p><span className="bold">Expenses:</span></p>
            <div className="historyModalExpenseContainer">
              {expenses.map((expense) => {
                return (
                  <div
                    style={{
                      backgroundColor: `${expense.color.value}`,
                      color: `${
                        expense.color.value === "#ffffff" ? "black" : "whitesmoke"
                      }`,
                    }}
                    className="historyModalExpense"
                  >
                    {expense.expenseName.value}: $
                    {formatNumber(expense.currentAmmount.value)}
                  </div>
                );
              })}
            </div>
            <p><span className="bold">Expenses Total:</span> ${formatNumber(expensesTotal)}</p>
          </div>
        )}
        {entryNotes && (
          <div>
            <p><span className="bold">Notes:</span></p>
            <p className="entryNotes">{entryNotes}</p>
          </div>
        )}

        <p><span className="bold">Prev Balance:</span> ${formatNumber(previousTotalBalance)}</p>
        <p><span className="bold">New Balance:</span> ${formatNumber(totalBalance)}</p>
      </div>
    </div>
  );
};

export default HistoryModal;
