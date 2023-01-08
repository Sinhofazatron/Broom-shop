import NotFoundBlock from "../components/NotFoundBlock/NotFoundBlock";
import { FC } from "react";

const PageNotFound: FC = () => {
  return (
    <div>
      <NotFoundBlock text={"Страница не найдена!"} />
    </div>
  );
};

export default PageNotFound;
