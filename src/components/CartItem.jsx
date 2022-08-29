import { useDispatch, useSelector } from "react-redux";
import { minusItem, removeItem, addItem } from "../redux/slices/cartSlice";

function CartItem({ id, title, description, imageUrl, price, count }) {
  const cartItem = useSelector((state) =>
    state.cart.items.find((obj) => obj.id === id)
  );
  const dispatch = useDispatch();

  const onClickPlus = () => {
    dispatch(addItem({ id }));
  };

  const onClickMinus = () => {
    dispatch(minusItem({ id }));
  };

  const onClickRemove = () => {
    dispatch(removeItem(id));
  };

  const img = (imgName) => {
    return require(`../assets/img/goods/${imgName}`);
  };

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={img(imageUrl)} alt="Broom" />
      </div>
      <div className="cart__item-info">
        <p className="cart__item-info-title">{title}</p>
        <p className="cart__item-info-text">{description}</p>
      </div>
      <div className="cart__item-count">
        <div className="cart__item-count-minus">
          {cartItem.count ? (
            <button
              onClick={onClickMinus}
              className="cart__item-count-minus-text"
            >
              -
            </button>
          ) : (
            ""
          )}
        </div>
        <b className="cart__item-count-number">{count}</b>
        <div className="cart__item-count-plus">
          <button onClick={onClickPlus} className="cart__item-count-plus-text">
            +
          </button>
        </div>
      </div>
      <div className="cart__item-price">
        <b className="cart__item-price-count">{price * count}</b>{" "}
        <span className="cart__item-price-count-rub"> ₽</span>
      </div>
      <div className="cart__item-remove">
        <svg
          onClick={onClickRemove}
          className="cart__item-remove-img"
          width="20"
          height="20"
          viewBox="0 0 10 10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"></path>
          <path d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"></path>
        </svg>
      </div>
    </div>
  );
}
export default CartItem;
