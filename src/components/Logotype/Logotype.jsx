import style from "./Logotype.module.css";
import { Link } from "react-router-dom";

const Logotype = () => {
  return (
    <div className={style.wrapper}>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          width="28"
          height="28"
        >
          <path d="M 0,50 A 50,50 0 1,1 100,50 Z" fill="#338AF3" />
          <path d="M 0,50 A 50,50 0 0,0 100,50 Z" fill="#FFDA44" />
        </svg>
      </span>
      <Link className={style.logotype} to="/">
        LearnLingo
      </Link>
    </div>
  );
};
export default Logotype;
