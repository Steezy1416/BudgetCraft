import { useState } from "react";
import { useBudget, useBudgetDispatch } from "../BudgetContext";
import { sortHistory } from "../utils/helper";
import HistoryModal from "../components/HistoryModal";
import HistoryEntryDateBlock from "../components/HistoryEntryDateBlock";

const HistoryPage = () => {
  const { history } = useBudget();

  const individualDays = sortHistory(history);

  const budgetContextDispatch = useBudgetDispatch();

  const [selectedEntry, setSelectedEntry] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const clearHistory = () => {
    budgetContextDispatch({
      type: "clearHistory",
    });
  };

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
          <div className="historyHeader">
            <h1>History</h1>
            <button className="clearHistoryBtn danger" onClick={clearHistory}>Clear History</button>
          </div>

          {individualDays.length === 0 ? (
            <p className="noHistoryMessage">You have no history</p>
          ) : (
            individualDays.map((day, index) => {
              return (
                <HistoryEntryDateBlock
                  key={day.date}
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
