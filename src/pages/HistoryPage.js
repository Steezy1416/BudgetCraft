import { useBudget, useBudgetDispatch } from "../BudgetContext";
import HistoryEntry from "../components/HistoryEntry";

const HistoryPage = () => {
  const { history } = useBudget();

  const reversedHistory = history.slice().reverse();

  console.log(reversedHistory);

  const entryDates = reversedHistory.map((entry) => entry.entryDate);

  const uniqueDates = entryDates.filter(
    (entryDate, index) => entryDates.indexOf(entryDate) === index
  );

  console.log(entryDates);
  console.log(uniqueDates);

  let seperatedDays = [];
  for (let i = 0; i < uniqueDates.length; i++) {
    const entries = reversedHistory.filter(
      (entry) => entry.entryDate === uniqueDates[i]
    );
    seperatedDays.push({
      date: uniqueDates[i],
      entries,
    });
  }

  console.log(seperatedDays);

  return (
    <div className="historyPageContainer">
      <h1>History</h1>

      {seperatedDays.map((day, index) => {
        return (
          <HistoryEntryBlock
            day={day.date}
            seperatedDays={seperatedDays[index]}
          />
        );
      })}
    </div>
  );
};

const HistoryEntryBlock = ({ day, seperatedDays }) => {
  console.log(seperatedDays.entries);
  const blockTitle = () => {
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
      <h2>{blockTitle()}</h2>
      {seperatedDays.entries.map((historyEntry) => {
        console.log(historyEntry);
        return <HistoryEntry historyEntry={historyEntry} />;
      })}
    </div>
  );
};

export default HistoryPage;

{
  /* {history.length === 0 ? (
        <p>You have no history</p>
      ) : (
        <div className="historyContainer">
          {reversedHistory.map((historyEntry) => {
            return (
              <HistoryEntry historyEntry={historyEntry}/>
            );
          })}
        </div>
      )} */
}
