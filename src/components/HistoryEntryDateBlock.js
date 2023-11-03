import HistoryEntry from "./HistoryEntry";

const HistoryEntryDateBlock = ({
  day,
  individualDays,
  openModal,
  closeModal,
  isModalOpen,
  setSelectedEntry,
}) => {
  const entryDate = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (day === today.toLocaleDateString()) {
      return "Today";
    } else if (day === yesterday.toLocaleDateString()) {
      return "Yesterday";
    } else {
      return day;
    }
  };

  return (
    <div className="entryDateBlock">
      <h2 className="entryDate">{entryDate()}</h2>
      <div className="entryDateBlockContainer">
        {individualDays.entries.map((historyEntry, index) => {
          return (
            <HistoryEntry
              key={`${historyEntry.entryDate}/${index}`}
              historyEntry={historyEntry}
              openModal={openModal}
              closeModal={closeModal}
              isModalOpen={isModalOpen}
              setSelectedEntry={setSelectedEntry}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HistoryEntryDateBlock;
