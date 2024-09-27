import { NavLink } from "react-router-dom";
import style from "./Navigation.module.css";
import clsx from "clsx";
import Logotype from "../Logotype/Logotype.jsx";
import { FiLogIn } from "react-icons/fi";
import { useState } from "react";

import SingUpModal from "../SingUpModal/SingUpModal.jsx";

const Navigation = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(style.navLink, isActive && style.navLinkActive);
  };
  const [visible] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <header className={style.container}>
      <Logotype />
      <nav className={style.headerNav}>
        <div className={style.menu}>
          <NavLink className={buildLinkClass} to="/">
            Home
          </NavLink>
          <NavLink className={buildLinkClass} to="/teachers">
            Teachers
          </NavLink>
          {visible && (
            <NavLink className={buildLinkClass} to="/favorites">
              Favorites
            </NavLink>
          )}
        </div>
        <div className={style.wrapper}>
          <div className={style.ukraine}>
            <FiLogIn size={20} color={"#F4C550"} />

            <button type="button" className={style.login}>
              Log in
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className={style.button}
            >
              Registration
            </button>

            <SingUpModal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
