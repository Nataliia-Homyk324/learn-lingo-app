import style from "./TeacherCard.module.css";
import { useState, useEffect } from "react";
import { IoBookOutline } from "react-icons/io5";
import { Link, Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loader from "../Loader/Loader.jsx";
import { GoHeartFill } from "react-icons/go";
import { GoHeart } from "react-icons/go";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookModal from "../BookModal/BookModal.jsx";

const TeacherCard = ({ teacher, showDetails, onReadMore }) => {
  const [isVisibleHeart, setVisibleHeart] = useState(false);
  const [user, setUser] = useState(null);
  const [isBookModalOpen, setBookModalOpen] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isFavorite = favorites.some(
      (favTeacher) => favTeacher.id === teacher.id
    );
    setVisibleHeart(isFavorite);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!user) {
        setVisibleHeart(false);
      }
    });

    return () => unsubscribe();
  }, [teacher.id, user]);

  const handleClickButtonHeart = () => {
    if (!user) {
      toast.error("This action is available for authorized users only.");
      return;
    }

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isVisibleHeart) {
      const updatedFavorites = favorites.filter(
        (favTeacher) => favTeacher.id !== teacher.id
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setVisibleHeart(false);
    } else {
      favorites.push(teacher);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setVisibleHeart(true);
    }
  };

  const handleBookLesson = () => {
    if (!user) {
      toast.error("This action is available for authorized users only.");
      return;
    }
    setBookModalOpen(true);
  };

  return (
    <div className={style.teacherCard}>
      <img
        src={teacher.avatar_url}
        alt={`${teacher.name} ${teacher.surname}`}
        className={style.teacherAvatar}
      />

      <div className={style.teacherInfo}>
        <div className={style.info}>
          <div className={style.title}>
            <span className={style.titleConditions}>Languages </span>
            <h2>
              {teacher.name} {teacher.surname}
            </h2>
          </div>

          <div className={style.titleList}>
            <IoBookOutline />
            <span className={style.titleListItem}>Lessons online</span>
            <p>
              ⭐ <span className={style.titleListItem}>Rating: </span>
              {teacher.rating}
            </p>
            <p>
              <span className={style.titleListItem}>Lessons done: </span>
              {teacher.lessons_done}
            </p>
            <p>
              <span className={style.titleListItem}>Price / 1 hour: </span>$
              <span className={style.price}>{teacher.price_per_hour}</span>
            </p>
          </div>
          <button
            className={style.heartContainer}
            onClick={handleClickButtonHeart}
          >
            {isVisibleHeart ? (
              <GoHeartFill className={style.heartFillIcon} />
            ) : (
              <GoHeart className={style.heartIcon} />
            )}
          </button>
        </div>
        <div className={style.conditions}>
          <p>
            <span className={style.titleConditions}>Speaks: </span>
            <span className={style.languages}>
              {teacher.languages.join(", ")}
            </span>
          </p>
          <p>
            <span className={style.titleConditions}>Lesson Info: </span>
            {teacher.lesson_info}
          </p>
          <p>
            <span className={style.titleConditions}>Conditions: </span>
            {teacher.conditions}
          </p>

          {!showDetails && (
            <Link
              to="details"
              className={style.link}
              state={{ teacher }}
              onClick={() => onReadMore(teacher.id)}
            >
              Read more
            </Link>
          )}

          {showDetails && (
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          )}
        </div>
        <div className={style.levelsList}>
          {teacher.levels.map((level, index) => (
            <div
              key={index}
              className={`${style.levelItem} ${
                index === 0 ? style.firstLevelItem : ""
              }`}
            >
              {level}
            </div>
          ))}
        </div>
        {showDetails && (
          <div>
            <button className={style.button} onClick={handleBookLesson}>
              Book trial lesson
            </button>
            {isBookModalOpen && (
              <BookModal
                isOpen={isBookModalOpen}
                onClose={() => setBookModalOpen(false)}
                teacher={teacher}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherCard;
