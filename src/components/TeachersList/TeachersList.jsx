// import { useEffect, useState } from "react";
// import { getDatabase, ref, get } from "firebase/database";
// import TeacherCard from "../TeacherCard/TeacherCard.jsx";
// import Loader from "../Loader/Loader.jsx";

// const TeachersList = () => {
//   const [teachers, setTeachers] = useState([]);

//   useEffect(() => {
//     const fetchTeachers = async () => {
//       const db = getDatabase();
//       const teachersRef = ref(db, "teachers");
//       const snapshot = await get(teachersRef);

//       if (snapshot.exists()) {
//         const data = snapshot.val();
//         const teachersArray = Object.values(data);
//         setTeachers(teachersArray);
//       } else {
//         console.log("Дані відсутні.");
//       }
//     };

//     fetchTeachers().catch(console.error);
//   }, []);

//   return (
//     <div>
//       {teachers.length > 0 ? (
//         teachers.map((teacher) => (
//           <TeacherCard
//             key={`${teacher.name}_${teacher.surname}`}
//             teacher={teacher}
//           />
//         ))
//       ) : (
//         <Loader />
//       )}
//     </div>
//   );
// };

// export default TeachersList;

import { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import TeacherCard from "../TeacherCard/TeacherCard.jsx";
import Loader from "../Loader/Loader.jsx";
import { app } from "../../../firebase.js"; // Importing the Firebase app

const database = getDatabase(app); // Using Firebase app to get the database instance

const TeachersList = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      const teachersRef = ref(database, "teachers");
      const snapshot = await get(teachersRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        // Convert the object into an array of teachers
        const teachersArray = Object.values(data);
        setTeachers(teachersArray);
      } else {
        console.log("Дані відсутні.");
      }
    };

    fetchTeachers().catch(console.error);
  }, []);

  return (
    <div>
      {teachers.length > 0 ? (
        teachers.map((teacher) => (
          <TeacherCard
            key={teacher.id} // Use the id provided in the teacher object
            teacher={teacher} // Pass the teacher object with the id
          />
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default TeachersList;
