import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from "chart.js";
import HomePageLink from "../components/HomePageLink";
import PercentageBadge from "../components/PercentageBadge";
import { useBudget } from "../BudgetContext";
import { GetPercentage, GetTotalBalance } from "../utils/helper";

ChartJS.register(ArcElement);

const HomePage = () => {
  const budgetData = useBudget();

  const isNegative = (ammount) => {
    return Math.sign(ammount) === -1 ? 0 : ammount;
  };

  const { totalBalance, expensesTotal, personalBalance, savings } = budgetData;

  const data = {
    datasets: [
      {
        data: [
          isNegative(expensesTotal),
          isNegative(personalBalance),
          isNegative(savings),
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

  const newTotal = GetTotalBalance(expensesTotal, personalBalance, savings);

  return (
    <div className="home-page-container">
      <div className="graph-container">
        <Pie data={data} options={{ events: [], animation: { duration: 0 } }} />
        <div className="graph-summary-container">
          <p className="graph-heading">Available Balance</p>
          <p className="graph-total">${newTotal}</p>
        </div>
      </div>

      <div className="percentage-container">
        <PercentageBadge percentage={GetPercentage(newTotal, expensesTotal)}>
          Exps
        </PercentageBadge>
        <PercentageBadge percentage={GetPercentage(newTotal, savings)}>
          Savings
        </PercentageBadge>
        <PercentageBadge percentage={GetPercentage(newTotal, personalBalance)}>
          Personal
        </PercentageBadge>
      </div>

      <div className="homePageLinkContainer">
        <HomePageLink
          className="historyHomeLink"
          title={"History"}
          isLink={totalBalance === 0 ? false : true}
        />
        <HomePageLink
          className="expensesHomeLink"
          title={"Expenses"}
          isLink={totalBalance === 0 ? false : true}
          ammount={expensesTotal}
        />
        <HomePageLink
          className="personalHomeLink"
          title={"Personal Balance"}
          isLink={false}
          ammount={personalBalance}
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
