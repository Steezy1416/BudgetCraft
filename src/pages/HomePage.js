import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Link } from "react-router-dom";
import HomePageLink from "../components/HomePageLink";

ChartJS.register(ArcElement);

const data = {
  datasets: [
    {
      data: [1000, 1800, 200],
      backgroundColor: [
        "rgba(255, 99, 132)",
        "rgba(54, 162, 235)",
        "rgba(255, 206, 86)",
      ],
      borderWidth: 1,
      borderColor: [
        "rgba(255, 99, 132)",
        "rgba(54, 162, 235)",
        "rgba(255, 206, 86)",
      ],
    },
  ],
};

const HomePage = () => {
  return (
    <>
      <div className="graph-container">
        <Pie data={data} options={{ events: [], animation: { duration: 0 } }} />
        <div className="graph-summary">
          <p className="graph-heading">Total Balance</p>
          <p className="graph-total">$1000</p>
        </div>
      </div>
      <div className="homePageLinkContainer">
        <HomePageLink title={"History"} isLink={true} />
        <HomePageLink title={"Expenses"} isLink={true} ammount={600} />
        <HomePageLink
          title={"Available Balance"}
          isLink={false}
          ammount={700}
        />
        <HomePageLink title={"Savings"} isLink={false} ammount={200} />
        <HomePageLink title={"Transaction"} isLink={true} />
      </div>
    </>
  );
};

export default HomePage;
