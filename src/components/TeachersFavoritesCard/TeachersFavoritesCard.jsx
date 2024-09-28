import style from "./TeachersFavoritesCard.module.css";
import { IoBookOutline } from "react-icons/io5";
import { Link, Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loader from "../Loader/Loader.jsx";
import { GoHeartFill } from "react-icons/go";

const TeachersFavoritesCard = ({ teacher, showDetails, onReadMore }) => {
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
            <div className={style.heartContainer}>
              <GoHeartFill className={style.heartFillIcon} />
            </div>
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
            <button className={style.button}>Book trial lesson</button>
          )}
        </div>
      </div>
    </div>
  );
};
export default TeachersFavoritesCard;
