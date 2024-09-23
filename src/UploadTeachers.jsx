import { useEffect } from "react";
import { getDatabase, ref, set, push } from "firebase/database";
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
        const teacherRef = push(ref(database, "teachers")); // Automatically generate a unique key
        await set(teacherRef, {
          ...teacher, // Spread the existing teacher data
          id: teacherRef.key, // Assign the unique key as the ID
        });
      }

      console.log("Teacher data has been successfully uploaded!");
    };

    uploadTeachers().catch(console.error);
  }, []);

  return null; // Return null or a suitable JSX element
};

export default UploadTeachers;
