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
    <div>
      <h2>{entryDate()}</h2>
      {individualDays.entries.map((historyEntry) => {
        return (
          <HistoryEntry
            historyEntry={historyEntry}
            openModal={openModal}
            closeModal={closeModal}
            isModalOpen={isModalOpen}
            setSelectedEntry={setSelectedEntry}
          />
        );
      })}
    </div>
  );
};

export default HistoryEntryDateBlock;
