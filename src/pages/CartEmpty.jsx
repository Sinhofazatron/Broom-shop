function CartEmpty() {
  return (
    <div className="goods__empty">
      <h1 className="goods__empty-title">В корзине ничего нет!</h1>
      <div className="goods__empty-img-wrapper">
        <img
          className="goods__empty-img"
          width={400}
          src={require("../assets/img/not-found.png")}
          alt="cart-empty"
        />
      </div>
    </div>
  );
}

export default CartEmpty;
