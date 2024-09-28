import style from "./FavoritesPage.module.css";
import TeachersFavoritesList from "../../components/TeachersFavoritesList/TeachersFavoritesList.jsx";

function FavoritesPage() {
  return (
    <div className={style.container}>
      <h1 className={style.title}>Your Favorite Teachers</h1>
      <TeachersFavoritesList />
    </div>
  );
}

export default FavoritesPage;
