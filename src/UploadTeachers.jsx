import { useEffect } from "react";
import { getDatabase, ref, set } from "firebase/database";
import teachersData from "./teachers.json";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA922kqfLqMvV9qRHPOrUV6GB3pbOzzfwU",
  authDomain: "learn-lingo-app-c6e98.firebaseapp.com",
  projectId: "learn-lingo-app-c6e98",
  storageBucket: "learn-lingo-app-c6e98.appspot.com",
  messagingSenderId: "845404324064",
  appId: "1:845404324064:web:bb129a90832ae2d71e5085",
  measurementId: "G-69SH91VWGW",
  databaseURL: "https://learn-lingo-app-c6e98-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const UploadTeachers = () => {
  useEffect(() => {
    const uploadTeachers = async () => {
      for (const teacher of teachersData) {
        const teacherRef = ref(
          database,
          `teachers/${teacher.name}_${teacher.surname}`
        );
        await set(teacherRef, teacher);
      }

      console.log("Дані викладачів успішно завантажено!");
    };

    uploadTeachers().catch(console.error);
  }, []);

  // return <div></div>;
};

export default UploadTeachers;
