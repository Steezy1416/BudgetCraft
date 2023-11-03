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

  let entryBgColor = () => {
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

  return isModalOpen ? (
    <></>
  ) : (
    <div
      style={{ backgroundColor: entryBgColor() }}
      className="historyEntry"
      onClick={handleEntrySelect}
    >
      <div className="historyEntryHeader entrySection">
        <p className="historyEntryMessage">{entryMessage}</p>
        <p>{entryDate}</p>
      </div>
      <div className="historyEntryFooter entrySection">
        <p className="historyEntryNotes">{entryNotes}</p>
        <p className="historyEntryAmmount">
          {entryType === "deposit"
            ? "+"
            : entryType === "withdrawal"
            ? "-"
            : ""}
          ${formatNumber(entryAmmount)}
        </p>
      </div>
    </div>
  );
};

export default HistoryEntry;
