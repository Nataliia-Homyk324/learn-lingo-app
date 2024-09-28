import { NavLink, useNavigate } from "react-router-dom";
import style from "./Navigation.module.css";
import clsx from "clsx";
import Logotype from "../Logotype/Logotype.jsx";
import { FiLogIn } from "react-icons/fi";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";
import SingUpModal from "../SingUpModal/SingUpModal.jsx";
import LogInModal from "../LogInModal/LogInModal.jsx";

const Navigation = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLoggedIn(true);
        navigate("/teachers");
      } else {
        setUserLoggedIn(false);
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const buildLinkClass = ({ isActive }) => {
    return clsx(style.navLink, isActive && style.navLinkActive);
  };

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
          {userLoggedIn && (
            <NavLink className={buildLinkClass} to="/favorites">
              Favorites
            </NavLink>
          )}
        </div>
        <div className={style.wrapper}>
          {!userLoggedIn && (
            <>
              <div className={style.fiLogin}>
                <FiLogIn size={20} color={"#F4C550"} />
                <button
                  type="button"
                  className={style.login}
                  onClick={() => setLoginModalOpen(true)}
                >
                  Log in
                </button>
                <LogInModal
                  isOpen={isLoginModalOpen}
                  onClose={() => setLoginModalOpen(false)}
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => setSignUpModalOpen(true)}
                  className={style.button}
                >
                  Registration
                </button>
                <SingUpModal
                  isOpen={isSignUpModalOpen}
                  onClose={() => setSignUpModalOpen(false)}
                />
              </div>
            </>
          )}
          {userLoggedIn && (
            <div className={style.fiLogin}>
              <RiLogoutBoxLine size={20} color={"#F4C550"} />
              <button
                type="button"
                className={style.login}
                onClick={() => auth.signOut()}
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
