import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { auth } from "../../../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { IoClose } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import style from "./LogInModal.module.css";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Incorrect email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must have at least 6 characters"),
});

const LogInModal = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      console.log("User login successful!", userCredential.email);
      toast.success("Login successful!");
      onClose();
    } catch (error) {
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      toast.error("Login failed. Please try again.");
    }
  };

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
            <IoClose size={20} />
          </button>
          <form
            className={style.loginForm}
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <div className={style.loginHeader}>
              <h2 className={style.titleModal}>Log In</h2>
              <p className={style.text}>
                Welcome back! Please enter your credentials to access your
                account and continue your search for an teacher.
              </p>
            </div>
            <div className={style.wrapperInput}>
              <div className={style.inputContainer}>
                <input
                  className={style.input}
                  type="email"
                  placeholder="email"
                  {...register("email")}
                />
                {errors.email && <p>{errors.email.message}</p>}
              </div>
              <div className={style.inputContainer}>
                <input
                  className={style.input}
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  {...register("password")}
                />
                <button
                  type="button"
                  className={style.eyeIcon}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
                {errors.password && <p>{errors.password.message}</p>}
              </div>
            </div>
            <button className={style.loginBtn} type="submit">
              Log In
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default LogInModal;
