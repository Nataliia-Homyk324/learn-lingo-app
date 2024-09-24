import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDatabase, ref, get } from "firebase/database";
import Loader from "../../components/Loader/Loader.jsx";
import { app } from "../../../firebase.js";

const database = getDatabase(app);

const TeachersDetailsPage = () => {
  const { id } = useParams(); // Отримуємо ID вчителя з URL
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacher = async () => {
      const teacherRef = ref(database, `teachers/${id}`);
      const snapshot = await get(teacherRef);

      console.log("Отриманий ID:", id); // Логування ID
      if (snapshot.exists()) {
        console.log("Дані вчителя:", snapshot.val()); // Логування даних вчителя
        setTeacher(snapshot.val());
      } else {
        console.log("Вчителя не знайдено.");
      }
      setLoading(false);
    };

    fetchTeacher().catch(console.error);
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!teacher) {
    return <p>Вчителя не знайдено.</p>;
  }

  return (
    <div>
      <img
        src={teacher.avatar_url}
        alt={`${teacher.name} ${teacher.surname}`}
        className="teacher-avatar"
      />
      <h2>
        {teacher.name} {teacher.surname}
      </h2>
      <p>Мови: {teacher.languages.join(", ")}</p>
      <p>Рейтинг: {teacher.rating}</p>
      <p>Уроків проведено: {teacher.lessons_done}</p>
      <p>Ціна за годину: ${teacher.price_per_hour}</p>
      <p>Інформація про урок: {teacher.lesson_info}</p>
      <p>Умови: {teacher.conditions}</p>
    </div>
  );
};

export default TeachersDetailsPage;
