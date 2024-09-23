import style from "./HomePage.module.css";
import block from "../../assets/img/block.png";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.titleBlock}>
          <h1 className={style.title}>
            Unlock your potential with the best{" "}
            <span className={style.span}>language</span> tutors
          </h1>
          <p className={style.text}>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>
          <Link className={style.button} to="/teachers">
            Get started
          </Link>
        </div>
        <div
          className={style.imgBlock}
          style={{
            backgroundImage: `url(${block})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>

      <ul className={style.listAdvantages}>
        <li className={style.advantage}>
          <div className={style.number}>32,000 +</div>
          <div className={style.item}>Experienced tutors</div>
        </li>
        <li className={style.advantage}>
          <div className={style.number}>300,000 +</div>
          <div className={style.item}>5-star tutor reviews</div>
        </li>
        <li className={style.advantage}>
          <div className={style.number}>120 +</div>
          <div className={style.item}>Subjects taught</div>
        </li>
        <li className={style.advantage}>
          <div className={style.number}>200 +</div>
          <div className={style.item}>Tutor nationalities</div>
        </li>
      </ul>
    </div>
  );
}

export default HomePage;
