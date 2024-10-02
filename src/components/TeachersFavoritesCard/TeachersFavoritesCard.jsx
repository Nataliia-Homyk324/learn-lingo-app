import style from "./TeachersFavoritesCard.module.css";
import { useState } from "react";
import { IoBookOutline } from "react-icons/io5";
import Details from "../Details/Details.jsx";
import { GoHeartFill } from "react-icons/go";
import "react-toastify/dist/ReactToastify.css";
import BookModal from "../BookModal/BookModal.jsx";

const TeachersFavoritesCard = ({ teacher, onToggleFavorite }) => {
  const [isBookModalOpen, setBookModalOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleClickButtonHeart = () => {
    onToggleFavorite(teacher.id);
  };
  const handleBookLesson = () => {
    setBookModalOpen(true);
  };

  const onReadMore = () => {
    setShowDetails(true);
  };

  return (
    <div>
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
              <GoHeartFill className={style.heartFillIcon} />
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
              <button className={style.link} onClick={onReadMore}>
                Read more
              </button>
            )}

            {showDetails && <Details teacher={teacher} />}
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
    </div>
  );
};
export default TeachersFavoritesCard;
