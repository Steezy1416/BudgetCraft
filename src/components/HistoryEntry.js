import { formatNumber } from "../utils/helper";

const HistoryEntry = ({
  historyEntry,
  openModal,
  isModalOpen,
  setSelectedEntry,
}) => {
  const { entryDate, entryType, entryMessage, entryNotes, entryAmmount } =
    historyEntry;

  const handleEntrySelect = () => {
    setSelectedEntry(historyEntry);
    openModal();
  };

  return isModalOpen ? (
    <></>
  ) : (
    <div onClick={handleEntrySelect}>
      <div>
        <p>{entryDate}</p>
        <p>{entryMessage}</p>
        <p>{entryNotes}</p>
      </div>
      <p>
        {entryType === "deposit" ? "+" : entryType === "withdrawal" ? "-" : ""}$
        {formatNumber(entryAmmount)}
      </p>
    </div>
  );
};

export default HistoryEntry;
