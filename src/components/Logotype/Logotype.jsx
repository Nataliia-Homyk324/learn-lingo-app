import style from "./Logotype.module.css";
import { Link } from "react-router-dom";
import icons from "../../assets/icons/icons.svg";

const Logotype = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.ukraine}>
        <svg className={style.icon}>
          <use href={`${icons}#icon-ukraine`}></use>
        </svg>
      </div>
      <Link className={style.logotype} to="/">
        LearnLingo
      </Link>
    </div>
  );
};
export default Logotype;
