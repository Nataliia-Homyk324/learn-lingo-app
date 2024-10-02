import style from "./Details.module.css";
import avatar from "../../assets/img/avatar.jpg";
import Loader from "../Loader/Loader.jsx";

const Details = ({ teacher }) => {
  if (!teacher) {
    return <Loader />;
  }

  return (
    <div>
      <p>{teacher.experience}</p>
      {teacher.reviews.length > 0 ? (
        teacher.reviews.map((review, index) => (
          <div key={index} className={style.review}>
            <div className={style.reviewAvatar}>
              <img
                src={avatar}
                alt={`${review.reviewer_name}'s avatar`}
                className={style.avatar}
              />
              <p className={style.rating}>
                <span className={style.name}>{review.reviewer_name}</span>{" "}
                <span>⭐ {review.reviewer_rating}.0</span>
              </p>
            </div>

            <p>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default Details;
