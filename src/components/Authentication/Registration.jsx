import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import Form from "./Form";

const Registration = ({ onClose }) => {
  const dispatch = useDispatch();

  const handleRegister = (email, password) => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
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
