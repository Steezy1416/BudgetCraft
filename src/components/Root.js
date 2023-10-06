import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { BudgetProvider } from "../BudgetContext";

const Root = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    document.body.classList.toggle("no-scroll");
  };

  return (
    <>
      <header className="main-nav-header">
        <div
          className={`overlay ${isNavOpen || "hiddenOverlay"}`}
          onClick={toggleNav}
        ></div>

        <button
          onClick={toggleNav}
          className={`${isNavOpen ? "openNav" : "closedNav"} nav-btn`}
        >
          <span className="nav-btn-circle"></span>
          <span className="nav-btn-circle"></span>
          <span className="nav-btn-circle"></span>
          <span className="nav-btn-circle"></span>
          <span className="nav-btn-circle"></span>
          <span className="nav-btn-circle"></span>
          <span className="nav-btn-circle"></span>
          <span className="nav-btn-circle"></span>
          <span className="nav-btn-circle"></span>
        </button>

        <nav className={`${isNavOpen && "open-nav"} main-navigation`}>
          <NavLink className={"navLink"} to={"/"}>
            Home
          </NavLink>
          <NavLink className={"navLink"} to={"/expenses"}>
            Expenses
          </NavLink>
          <NavLink className={"navLink"} to={"/transaction"}>
            Transaction
          </NavLink>
          <NavLink className={"navLink"} to={"/history"}>
            History
          </NavLink>
        </nav>
      </header>
      <main>
        <BudgetProvider>
          <Outlet />
        </BudgetProvider>
      </main>
    </>
  );
};

export default Root;
