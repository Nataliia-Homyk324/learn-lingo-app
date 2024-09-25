import { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import TeacherCard from "../TeacherCard/TeacherCard.jsx";
import Loader from "../Loader/Loader.jsx";
import { app } from "../../../firebase.js";

const database = getDatabase(app);

const TeachersList = () => {
  const [teachers, setTeachers] = useState([]);
  const [expandedTeacherId, setExpandedTeacherId] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      const teachersRef = ref(database, "teachers");
      const snapshot = await get(teachersRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const teachersArray = Object.values(data);
        setTeachers(teachersArray);
      } else {
        console.log("Дані відсутні.");
      }
    };

    fetchTeachers().catch(console.error);
  }, []);

  const handleReadMore = (id) => {
    setExpandedTeacherId((prevId) => (prevId === id ? null : id)); // Встановлюємо ID для відображення деталей
  };

  return (
    <div>
      {teachers.length > 0 ? (
        teachers.map((teacher) => (
          <TeacherCard
            key={teacher.id}
            teacher={teacher}
            showDetails={expandedTeacherId === teacher.id} // Перевіряємо, чи ID вчителя збігається з активним
            onReadMore={handleReadMore} // Передаємо функцію обробки
          />
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default TeachersList;
