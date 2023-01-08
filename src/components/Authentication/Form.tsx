import { FC, useState } from "react";
import styles from "./Form.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type FormProps = {
  title: string;
  btnTitle: string;
  handleClick: (email: string, pass: string) => void;
};

type ShippingFields = {
  emails: string;
  password: string;
};

const SchemaValidation = yup
  .object({
    emails: yup
      .string()
      .email("Необходимо ввести валидный E-mail")
      .required("E-mail обязателен!"),
    password: yup
      .string()
      .min(6, "Пароль: минимум 6 символов")
      .required("Пароль обязателен!"),
  })
  .required();

const Form: FC<FormProps> = ({ handleClick, title, btnTitle }) => {
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm<ShippingFields>({
    mode: "onChange",
    resolver: yupResolver(SchemaValidation),
  });

  const onSubmit: SubmitHandler<ShippingFields> = (data) => console.log(data);

  return (
    <div className={styles.root}>
      <p className={styles.title}>{title}</p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          {...register("emails", {
            onChange: (e) => setEmail(e.target.value),
          })}
          className={styles.input}
          type="email"
          name="emails"
          value={email}
          placeholder="email"
        />
        <p className={styles.error}>{errors.emails?.message}</p>

        <input
          {...register("password", {
            onChange: (e) => setPass(e.target.value.trim()),
          })}
          className={styles.input}
          type="password"
          name="password"
          value={pass}
          placeholder="password"
        />
        <p className={styles.error}>{errors.password?.message}</p>
      </form>
      <button
        className={formState.isValid ? styles.button : styles.button_disabled}
        onClick={() => handleClick(email, pass)}
        disabled={!formState.isValid}
      >
        {btnTitle}
      </button>
    </div>
  );
};

export default Form;
