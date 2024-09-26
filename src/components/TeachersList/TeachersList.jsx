import { useEffect, useState } from "react";
import { getDatabase, ref, get, query, limitToFirst } from "firebase/database";
import TeacherCard from "../TeacherCard/TeacherCard.jsx";
import Loader from "../Loader/Loader.jsx";
import { app } from "../../../firebase.js";
import style from "./TeachersList.module.css";

const database = getDatabase(app);
const ITEMS_PER_PAGE = 4;

const TeachersList = () => {
  const [teachers, setTeachers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [expandedTeacherId, setExpandedTeacherId] = useState(null);

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

  const loadMoreTeachers = () => {
    if (hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleReadMore = (id) => {
    setExpandedTeacherId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div>
      {teachers.length > 0 ? (
        <>
          {teachers.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              showDetails={expandedTeacherId === teacher.id}
              onReadMore={handleReadMore}
            />
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
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default TeachersList;
