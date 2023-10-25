import { useBudget, useBudgetDispatch } from "../BudgetContext";
import HistoryEntry from "../components/HistoryEntry";

const HistoryPage = () => {
  const { history } = useBudget();

  console.log(history);

  return (
    <div className="historyPageContainer">
      <h1>History</h1>
      {history.length === 0 ? (
        <p>You have no history</p>
      ) : (
        <div className="historyContainer">
          {history.map((historyEntry) => {
            return (
              <HistoryEntry historyEntry={historyEntry}/>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
