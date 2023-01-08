import styles from "./NotFoundBlock.module.scss";
import { FC } from "react";

type NotFoundBlockProps = {
  text: string;
};

const NotFoundBlock: FC<NotFoundBlockProps> = ({ text }) => {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>{text}</h1>
      <img
        className={styles.img}
        width={400}
        src={require("../../assets/img/not-found.png")}
        alt="page-not-found"
      />
    </div>
  );
};

export default NotFoundBlock;
