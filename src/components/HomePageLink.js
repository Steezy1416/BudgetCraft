import { Link } from "react-router-dom";

const HomePageLink = ({ title, ammount = "", isLink }) => {
  return isLink ? (
    <Link to={title.toLowerCase()}>
      <p>{title}</p>
      <div>
        {ammount && <p>{ammount}</p>}
        <span>
          <i class="fa-solid fa-arrow-right"></i>
        </span>
      </div>
    </Link>
  ) : (
    <div>
      <p>{title}</p>
      <p>{ammount}</p>
    </div>
  );
};

export default HomePageLink;
