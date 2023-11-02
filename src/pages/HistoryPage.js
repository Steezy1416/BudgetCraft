import { useState } from "react";
import { useBudget } from "../BudgetContext";
import HistoryEntry from "../components/HistoryEntry";
import { sortHistory } from "../utils/helper";
import HistoryModal from "../components/HistoryModal";
import HistoryEntryDateBlock from "../components/HistoryEntryDateBlock";

const HistoryPage = () => {
  const { history } = useBudget();

  const individualDays = sortHistory(history);

  const [selectedEntry, setSelectedEntry] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="historyPageContainer">
      <div
        onClick={closeModal}
        className={isModalOpen ? "historyOverlay" : ""}
      ></div>
      {isModalOpen ? (
        <>
          <HistoryModal selectedEntry={selectedEntry} closeModal={closeModal} />
        </>
      ) : (
        <>
          <h1>History</h1>

          {individualDays.length === 0 ? (
            <p>You have no history</p>
          ) : (
            individualDays.map((day, index) => {
              return (
                <HistoryEntryDateBlock
                  day={day.date}
                  individualDays={individualDays[index]}
                  openModal={openModal}
                  closeModal={closeModal}
                  isModalOpen={isModalOpen}
                  setSelectedEntry={setSelectedEntry}
                />
              );
            })
          )}
        </>
      )}
    </div>
  );
};

export default HistoryPage;
