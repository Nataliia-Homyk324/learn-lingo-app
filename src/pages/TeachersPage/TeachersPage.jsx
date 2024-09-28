import { useState, useEffect } from "react";
import style from "./TeachersPage.module.css";
import TeachersList from "../../components/TeachersList/TeachersList.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";

function TeachersPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        localStorage.removeItem("favorites");
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      setSelectedLanguage("");
      setSelectedLevel("");
      setSelectedPrice("");
    }
  }, [isLoggedIn]);

  return (
    <div className={style.container}>
      <div className={style.filters}>
        <div className={style.selector}>
          <label htmlFor="languageSelect" className={style.label}>
            Languages
          </label>
          <select
            id="languageSelect"
            className={style.selectLanguage}
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="French" className={style.option}>
              French
            </option>
            <option value="English" className={style.option}>
              English
            </option>
            <option value="German" className={style.option}>
              German
            </option>
            <option value="Spanish" className={style.option}>
              Spanish
            </option>
            <option value="Ukrainian" className={style.option}>
              Ukrainian
            </option>
          </select>
        </div>

        <div className={style.selector}>
          <label htmlFor="levelSelect" className={style.label}>
            Level of knowledge
          </label>
          <select
            id="levelSelect"
            className={style.selectLevel}
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            <option value="A1 Beginner" className={style.option}>
              A1 Beginner
            </option>
            <option value="A2 Elementary" className={style.option}>
              A2 Elementary
            </option>
            <option value="B1 Intermediate" className={style.option}>
              B1 Intermediate
            </option>
            <option value="B2 Upper-Intermediate" className={style.option}>
              B2 Upper-Intermediate
            </option>
          </select>
        </div>
        <div className={style.selector}>
          <label htmlFor="priceSelect" className={style.label}>
            Price
          </label>
          <select
            id="priceSelect"
            className={style.selectPrice}
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
          >
            <option value="25" className={style.option}>
              up to 25 $
            </option>
            <option value="30" className={style.option}>
              up to 30 $
            </option>
            <option value="35" className={style.option}>
              up to 35 $
            </option>
          </select>
        </div>
      </div>
      <TeachersList
        selectedLanguage={selectedLanguage}
        selectedLevel={selectedLevel}
        selectedPrice={selectedPrice}
      />
    </div>
  );
}

export default TeachersPage;
