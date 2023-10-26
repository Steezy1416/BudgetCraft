const HistoryEntry = ({ historyEntry }) => {
  const { entryDate, entryType, entryMessage, entryNotes, entryAmmount } =
    historyEntry;

  return (
    <div>
      <div>
        <p>{entryDate}</p>
        <p>{entryMessage}</p>
        <p>{entryNotes}</p>
      </div>
      <p>
        {entryType === "deposit" ? "+" : entryType === "withdrawal" ? "-" : ""}$
        {entryAmmount}
      </p>
    </div>
  );
};

export default HistoryEntry;
