import style from "./Details.module.css";
import avatar from "../../assets/img/avatar.jpg";

import { useLocation } from "react-router-dom";

const Details = () => {
  const location = useLocation();
  const { teacher } = location.state || {};

  if (!teacher) {
    return <p>Loading details...</p>;
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
