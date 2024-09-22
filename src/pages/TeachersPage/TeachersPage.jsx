import style from "./TeachersPage.module.css";
import UploadTeachers from "../../UploadTeachers.jsx";
import TeachersList from "../../components/TeachersList/TeachersList.jsx";

function TeachersPage() {
  return (
    <div className={style.container}>
      <UploadTeachers />
      <TeachersList />
    </div>
  );
}
export default TeachersPage;
