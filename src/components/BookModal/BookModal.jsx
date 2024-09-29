// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

// import { IoClose } from "react-icons/io5";

// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import style from "./BookModal.module.css";

// const schema = yup.object().shape({
//   fullName: yup.string().min(3).max(20).required("Full Name is required"),
//   email: yup
//     .string()
//     .required("Email is required")
//     .email("Incorrect email format"),
//   phoneNumber: yup
//     .string()
//     .required("Phone number is required")
//     .matches(
//       /^[0-9+()-\s]*$/,
//       "Phone number can only contain digits, spaces, or symbols like +, (, ) or -"
//     )
//     .min(10, "Phone number must have at least 10 digits")
//     .max(15, "Phone number can't exceed 15 digits"),
// });

// const BookModal = ({ isOpen, onClose }) => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     clearErrors,

//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = () => {
//     toast.success("Lesson successfully booked!");
//     onClose();
//   };

//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === "Escape") {
//         onClose();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("keydown", handleKeyDown);
//     } else {
//       document.removeEventListener("keydown", handleKeyDown);
//     }

//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [isOpen, onClose]);

//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };
//   useEffect(() => {
//     if (!isOpen) {
//       reset();
//       clearErrors();
//     }
//   }, [isOpen, reset, clearErrors]);

//   return (
//     isOpen && (
//       <div className={style.backdrop} onClick={handleBackdropClick}>
//         <div className={style.modalContainer}>
//           <button className={style.closeButton} onClick={onClose}>
//             <IoClose size={20} />
//           </button>
//           <form
//             className={style.loginForm}
//             onSubmit={handleSubmit(onSubmit)}
//             autoComplete="off"
//           >
//             <div className={style.loginHeader}>
//               <h2 className={style.title}>Book trial lesson</h2>
//               <p className={style.text}>
//                 Our experienced tutor will assess your current language level,
//                 discuss your learning goals, and tailor the lesson to your
//                 specific needs.
//               </p>
//             </div>
//             <div className={style.wrapperInput}>
//               <div className={style.inputContainer}>
//                 <input
//                   className={style.input}
//                   type="text"
//                   placeholder="Full Name"
//                   {...register("fullName")}
//                 />
//                 {errors.fullName && <p>{errors.fullName.message}</p>}
//               </div>
//               <div className={style.inputContainer}>
//                 <input
//                   className={style.input}
//                   type="email"
//                   placeholder="email"
//                   {...register("email")}
//                 />
//                 {errors.email && <p>{errors.email.message}</p>}
//               </div>
//               <div className={style.inputContainer}>
//                 <input
//                   className={style.input}
//                   type={"text"}
//                   placeholder="Phone number"
//                   {...register("phoneNumber")}
//                 />

//                 {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
//               </div>
//             </div>
//             <button className={style.loginBtn} type="submit">
//               Book
//             </button>
//           </form>
//         </div>
//       </div>
//     )
//   );
// };

// export default BookModal;

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import style from "./BookModal.module.css";

const schema = yup.object().shape({
  fullName: yup.string().min(3).max(20).required("Full Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Incorrect email format"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^[0-9+()-\s]*$/,
      "Phone number can only contain digits, spaces, or symbols like +, (, ) or -"
    )
    .min(10, "Phone number must have at least 10 digits")
    .max(15, "Phone number can't exceed 15 digits"),
  category: yup.string().required("Please select a lesson category"),
});

const categories = [
  "Career and business",
  "Lesson for kids",
  "Living abroad",
  "Exams and coursework",
  "Culture, travel or hobby",
];

const BookModal = ({ isOpen, onClose, teacher }) => {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      category: "Career and business",
    },
  });

  const onSubmit = () => {
    toast.success("Lesson successfully booked!");
    onClose();
  };

  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if (event.key === "Escape") {
  //       onClose();
  //     }
  //   };

  //   if (isOpen) {
  //     document.addEventListener("keydown", handleKeyDown);
  //   } else {
  //     document.removeEventListener("keydown", handleKeyDown);
  //   }

  //   return () => {
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [isOpen, onClose]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      reset();
      clearErrors();
    }
  }, [isOpen, reset, clearErrors]);

  return (
    isOpen && (
      <div className={style.backdrop} onClick={handleBackdropClick}>
        <div className={style.modalContainer}>
          <button className={style.closeButton} onClick={onClose}>
            <IoClose size={32} />
          </button>
          <form
            className={style.loginForm}
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <div className={style.loginHeader}>
              <h2 className={style.title}>Book trial lesson</h2>
              <p className={style.text}>
                Our experienced tutor will assess your current language level,
                discuss your learning goals, and tailor the lesson to your
                specific needs.
              </p>
            </div>
            <div className={style.wrapperTeacher}>
              <img
                src={teacher.avatar_url}
                alt={`${teacher.name} ${teacher.surname}`}
                className={style.avatar}
              />

              <div className={style.wrapperName}>
                <p className={style.avatarText}>Your teacher</p>
                <p className={style.avatarName}>
                  {teacher.name} {teacher.surname}
                </p>
              </div>
            </div>

            <h2 className={style.radioTitle}>
              What is your main reason for learning English?
            </h2>

            {/* Radio buttons for categories */}
            <div className={style.radioGroup}>
              {categories.map((category) => (
                <label key={category} className={style.radioLabel}>
                  <input
                    type="radio"
                    value={category}
                    {...register("category")}
                  />
                  {category}
                </label>
              ))}
              {errors.category && <p>{errors.category.message}</p>}
            </div>

            <div className={style.wrapperInput}>
              <div className={style.inputContainer}>
                <input
                  className={style.input}
                  type="text"
                  placeholder="Full Name"
                  {...register("fullName")}
                />
                {errors.fullName && <p>{errors.fullName.message}</p>}
              </div>
              <div className={style.inputContainer}>
                <input
                  className={style.input}
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                />
                {errors.email && <p>{errors.email.message}</p>}
              </div>
              <div className={style.inputContainer}>
                <input
                  className={style.input}
                  type="text"
                  placeholder="Phone number"
                  {...register("phoneNumber")}
                />
                {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
              </div>
            </div>
            <button className={style.loginBtn} type="submit">
              Book
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default BookModal;
