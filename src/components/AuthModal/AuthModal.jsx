import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { auth } from "../../../firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import style from "./AuthModal.module.css";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email є обовʼязковим")
    .email("Некоректний формат email"),
  password: yup
    .string()
    .required("Пароль є обовʼязковим")
    .min(6, "Пароль має бути щонайменше 6 символів"),
});

const AuthModal = ({ isOpen, onClose }) => {
  const [isRegistering, setIsRegistering] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, data.email, data.password);
      } else {
        await signInWithEmailAndPassword(auth, data.email, data.password);
      }
      // Тут можна додати логіку для отримання даних про поточного користувача
      onClose();
    } catch (error) {
      console.error(error);
      // Можна додати обробку помилок для відображення повідомлень
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      className={`${style.modal} ${isOpen ? style.open : ""}`}
      onKeyDown={handleKeyDown}
    >
      <div className={style.modalContent}>
        <button className={style.closeButton} onClick={onClose}>
          ✖
        </button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>{isRegistering ? "Реєстрація" : "Логін"}</h2>
          <div>
            <label>Email:</label>
            <input type="email" {...register("email")} />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div>
            <label>Пароль:</label>
            <input type="password" {...register("password")} />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <button type="submit">
            {isRegistering ? "Зареєструватись" : "Увійти"}
          </button>
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering
              ? "Маєш акаунт? Увійти"
              : "Немає акаунту? Зареєструватись"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
