import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import Form from "./Form";
import { FC } from "react";

type RegistrationProps = {
  onClose: () => void;
};

const Registration: FC<RegistrationProps> = ({ onClose }) => {
  const dispatch = useDispatch();

  const handleRegister = (email: string, password: string) => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        onClose();
      })
      .catch(() => alert("Пользователь с такими данными уже существует!"));
  };

  return (
    <div>
      <Form
        title={"Зарегистрироваться"}
        handleClick={handleRegister}
        btnTitle={"Регистрация"}
      />
    </div>
  );
};
export default Registration;
