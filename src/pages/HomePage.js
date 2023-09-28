import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from "chart.js";
import HomePageLink from "../components/HomePageLink";
import PercentageBadge from "../components/PercentageBadge";

ChartJS.register(ArcElement);

const HomePage = () => {
  const financialData = {
    availableBalance: () => {
      return expensesTotal + personalMoney + savings;
    },
    expensesTotal: 352.5,
    personalMoney: 317.36,
    savings: 1800,
    expenses: [],
    expensePercentage: () => {
      return Math.round((expensesTotal / availableBalance()) * 100);
    },
    personalPercentage: () => {
      return Math.round((personalMoney / availableBalance()) * 100);
    },
    savingsPercentage: () => {
      return Math.round((savings / availableBalance()) * 100);
    },
  };

  const data = {
    datasets: [
      {
        data: [
          financialData.expensesTotal,
          financialData.personalMoney,
          financialData.savings,
        ],
        backgroundColor: [
          "rgb(214, 40, 40)",
          "rgb(10, 147, 150)",
          "rgb(238, 155, 0)",
        ],
        borderWidth: 1,
        borderColor: [
          "rgb(214, 40, 40)",
          "rgb(10, 147, 150)",
          "rgb(238, 155, 0)",
        ],
      },
    ],
  };

  const {
    availableBalance,
    expensesTotal,
    personalMoney,
    savings,
    expensePercentage,
    savingsPercentage,
    personalPercentage,
  } = financialData;

  return (
    <div className="home-page-container">
      <div className="graph-container">
        <Pie data={data} options={{ events: [], animation: { duration: 0 } }} />
        <div className="graph-summary-container">
          <p className="graph-heading">Available Balance</p>
          <p className="graph-total">${availableBalance()}</p>
        </div>
      </div>

      <div className="percentage-container">
        <PercentageBadge percentage={expensePercentage()}>
          Exps
        </PercentageBadge>
        <PercentageBadge percentage={savingsPercentage()}>
          Savings
        </PercentageBadge>
        <PercentageBadge percentage={personalPercentage()}>
          Personal
        </PercentageBadge>
      </div>

      <div className="homePageLinkContainer">
        <HomePageLink
          className="historyHomeLink"
          title={"History"}
          isLink={true}
        />
        <HomePageLink
          className="expensesHomeLink"
          title={"Expenses"}
          isLink={true}
          ammount={expensesTotal}
        />
        <HomePageLink
          className="personalHomeLink"
          title={"Personal Balance"}
          isLink={false}
          ammount={personalMoney}
        />
        <HomePageLink
          className="savingsHomeLink"
          title={"Savings"}
          isLink={false}
          ammount={savings}
        />
        <HomePageLink
          className="transactionHomeLink"
          title={"Transaction"}
          isLink={true}
        />
      </div>
    </div>
  );
};

export default HomePage;
