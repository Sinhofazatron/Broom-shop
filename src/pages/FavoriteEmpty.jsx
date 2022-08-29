function FavoriteEmpty() {
  return (
    <div className="goods__empty">
      <h1 className="goods__empty-title">В избранном ничего нет!</h1>
      <div className="goods__empty-img-wrapper">
        <img
          className="goods__empty-img"
          width={400}
          src={require("../assets/img/favorite-empty.png")}
          alt="favorite-empty"
        />
      </div>
    </div>
  );
}

export default FavoriteEmpty;
