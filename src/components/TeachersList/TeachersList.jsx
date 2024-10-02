import { useEffect, useState } from "react";
import { getDatabase, ref, get, query, limitToFirst } from "firebase/database";
import TeacherCard from "../TeacherCard/TeacherCard.jsx";
import Loader from "../Loader/Loader.jsx";
import { app } from "../../../firebase.js";
import style from "./TeachersList.module.css";

const database = getDatabase(app);
const ITEMS_PER_PAGE = 4;

const TeachersList = ({ selectedLanguage, selectedLevel, selectedPrice }) => {
  const [teachers, setTeachers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filteredTeachers, setFilteredTeachers] = useState([]);

  const fetchTeachers = async (page) => {
    setLoading(true);
    const teachersRef = ref(database, "teachers");
    const snapshot = await get(
      query(teachersRef, limitToFirst(page * ITEMS_PER_PAGE))
    );

    if (snapshot.exists()) {
      const data = snapshot.val();
      const teachersArray = Object.values(data);

      setTeachers((prevTeachers) => [
        ...prevTeachers,
        ...teachersArray.slice(prevTeachers.length),
      ]);

      if (teachersArray.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      }
    } else {
      setHasMore(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTeachers(currentPage).catch(console.error);
  }, [currentPage]);

  useEffect(() => {
    const filtered = teachers.filter((teacher) => {
      const matchesLanguage =
        selectedLanguage === "" ||
        teacher.languages.some((language) =>
          language.toLowerCase().includes(selectedLanguage.toLowerCase())
        );
      const matchesLevel =
        selectedLevel === "" ||
        teacher.levels.some(
          (level) => level.toLowerCase() === selectedLevel.toLowerCase()
        );
      const matchesPrice =
        selectedPrice === "" || teacher.price_per_hour <= Number(selectedPrice);

      return matchesLanguage && matchesLevel && matchesPrice;
    });

    setFilteredTeachers(filtered);
  }, [teachers, selectedLanguage, selectedLevel, selectedPrice]);

  const loadMoreTeachers = () => {
    if (hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : filteredTeachers.length === 0 ? (
        <div className={style.text}>
          No teachers match your filter criteria. Please adjust your filters.
        </div>
      ) : (
        <>
          {filteredTeachers.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}

          {hasMore && (
            <div className={style.buttonContainer}>
              <button
                className={style.button}
                onClick={loadMoreTeachers}
                disabled={loading}
              >
                {loading ? <Loader /> : "Load more"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TeachersList;
