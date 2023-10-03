import { Link } from "react-router-dom";

const HomePageLink = ({ title, ammount = "", isLink, className }) => {
  return isLink ? (
    <Link className={`${className} homePageLink`} to={title.toLowerCase()}>
      <p className="homeLinkTitle">{title}</p>
      {
        ammount
        ?
        <div className="homeLinkAmmountSubContainer">
        <p className="homeLinkAmmount">{ammount}</p>
        <span className="homeLinkBtn">
          <i className="fa-solid fa-arrow-right homeLinkIcon"></i>
        </span>
      </div>
      :
      <div className="homeLinkButtonSubContainer">
        <span className="homeLinkBtn">
          <i className="fa-solid fa-arrow-right homeLinkIcon"></i>
        </span>
      </div>
      }
    </Link>
  ) : (
    <div className={`${className} homePageLink`}>
      <p className="homeLinkTitle">{title}</p>
      <p className="homeLinkAmmount">{ammount}</p>
    </div>
  );
};

export default HomePageLink;
