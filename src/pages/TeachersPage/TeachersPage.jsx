import style from "./TeachersPage.module.css";
import TeachersList from "../../components/TeachersList/TeachersList.jsx";

function TeachersPage() {
  return (
    <div className={style.container}>
      <TeachersList />
    </div>
  );
}
export default TeachersPage;
