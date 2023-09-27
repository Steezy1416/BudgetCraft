import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const Root = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <header className="main-nav-header">
        <div
          className={isNavOpen && "activeOverlay"}
          onClick={() => setIsNavOpen(!isNavOpen)}
        ></div>

        <button
          onClick={() => setIsNavOpen(!isNavOpen)}
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
        <Outlet />
      </main>
    </>
  );
};

export default Root;
