import style from "./TeacherCard.module.css";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";

const TeacherCard = ({ teacher }) => {
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
          <div className={style.heartContainer}>
            <FaRegHeart className={style.heartIcon} />
          </div>
        </div>

        {/* <p>
            <span>Досвід: </span>
            {teacher.experience} 
          </p> */}
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
          <Link to={`/teachers/${teacher.id}`} className={style.button}>
            Read more
          </Link>
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
      </div>
    </div>
  );
};

export default TeacherCard;
