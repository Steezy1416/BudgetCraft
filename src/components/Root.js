import { NavLink, Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <header>
        <button>
          <span className="nav-btn-circle"></span>
          <span className="nav-btn-circle"></span>
          <span className="nav-btn-circle"></span>
          <span className="nav-btn-circle"></span>
          <span className="nav-btn-circle"></span>
          <span className="nav-btn-circle"></span>
        </button>
        <nav>
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/expenses"}>Expenses</NavLink>
          <NavLink to={"/transaction"}>Transaction</NavLink>
          <NavLink to={"/history"}>History</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Root;
