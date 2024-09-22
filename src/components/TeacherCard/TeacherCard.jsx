import style from "./TeacherCard.module.css"; // Підключення стилів

const TeacherCard = ({ teacher }) => {
  return (
    <div className={style.teacherCard}>
      <img
        src={teacher.avatar_url}
        alt={`${teacher.name} ${teacher.surname}`}
        className={style.teacherAvatar}
      />
      <div className={style.teacherInfo}>
        <h2>
          {teacher.name} {teacher.surname}
        </h2>
        <p>
          <strong>Мови: </strong>
          {teacher.languages.join(", ")}
        </p>
        <p>
          <strong>Рівні: </strong>
          {teacher.levels.join(", ")}
        </p>
        <p>
          <strong>Рейтинг: </strong>
          {teacher.rating} ⭐
        </p>
        <p>
          <strong>Кількість уроків: </strong>
          {teacher.lessons_done}
        </p>
        <p>
          <strong>Ціна за годину: </strong>${teacher.price_per_hour}
        </p>
        <p>
          <strong>Досвід: </strong>
          {teacher.experience} років
        </p>
        <p>
          <strong>Інформація про урок: </strong>
          {teacher.lesson_info}
        </p>
        <p>
          <strong>Умови: </strong>
          {teacher.conditions}
        </p>
      </div>
    </div>
  );
};

export default TeacherCard;
