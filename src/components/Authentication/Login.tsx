import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import Form from "./Form";
import { FC } from "react";

type LoginProps = {
  onClose: () => void;
};

const Login: FC<LoginProps> = ({ onClose }) => {
  const dispatch = useDispatch();

  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
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
      .catch(() => alert("Пользователь с такими данными не найден!"));
  };

  return (
    <div>
      <Form title={"Вход"} handleClick={handleLogin} btnTitle={"Войти"} />
    </div>
  );
};
export default Login;
