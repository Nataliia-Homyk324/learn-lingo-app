import style from "./TeachersFavoritesList.module.css";
import TeachersFavoritesCard from "../TeachersFavoritesCard/TeachersFavoritesCard.jsx";
import { useState, useEffect } from "react";
import Loader from "../Loader/Loader.jsx";

const TeachersFavoritesList = () => {
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setTeachers(favorites);
    setLoading(false);
  }, []);

  const handleToggleFavorite = (id) => {
    const updatedTeachers = teachers.filter((teacher) => teacher.id !== id);
    setTeachers(updatedTeachers);
    localStorage.setItem("favorites", JSON.stringify(updatedTeachers));
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : teachers.length === 0 ? (
        <div className={style.text}>
          Unfortunately, there are no favorite teachers yet!
        </div>
      ) : (
        <>
          {teachers.map((teacher) => (
            <TeachersFavoritesCard
              key={teacher.id}
              teacher={teacher}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default TeachersFavoritesList;
