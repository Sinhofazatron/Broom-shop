import styles from "./NotFoundBlock.module.scss";

function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Страница не найдена!</h1>
      <img
        className={styles.img}
        width={400}
        src={require("../../assets/img/not-found.png")}
        alt="page-not-found"
      />
    </div>
  );
}

export default NotFoundBlock;
