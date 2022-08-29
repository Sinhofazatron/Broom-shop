import { useDispatch, useSelector } from "react-redux";
import { removeItemToFavorite } from "../redux/slices/favoriteSlice";
import { addItem } from "../redux/slices/cartSlice";

function FavoriteItem({ id, title, imageUrl, price, rating, description }) {
  const cartItem = useSelector((state) =>
    state.cart.items.find((obj) => obj.id === id)
  );
  const dispatch = useDispatch();

  const item = {
    id,
    title,
    description,
    imageUrl,
    price,
    rating,
  };

  const idCart = cartItem ? cartItem.id : 0;

  const addBroomToCart = () => {
    dispatch(addItem(item));
  };

  const onClickDelete = () => {
    dispatch(removeItemToFavorite(id));
  };

  const img = (imgName) => {
    return require(`../assets/img/goods/${imgName}`);
  };

  return (
    <>
      <li className="broom__item">
        <img
          className="broom__item-img favorite__broom-item-img"
          src={img(imageUrl)}
          alt="broom"
        />
        <p className="broom__item-title favorite__broom-item-title">{title}</p>
        <div className="broom__item-purchase-block">
          <span className="broom__item-purchase-block-sub-line"></span>
          <div className="broom__item-purchase-block-info">
            <div className="broom__item-purchase-block-info-rating">
              <span className="broom__item-purchase-block-rating-count">
                {rating}
              </span>
              <img
                className="broom__item-purchase-block-rating-img"
                src={require("../assets/img/rating-icon.png")}
                alt="rating"
              />
            </div>
            <span className="broom__item-purchase-block-price">{price} ₽</span>
          </div>
          <div className="broom__item-purchase-block-buy">
            <button
              onClick={onClickDelete}
              className="broom__item-purchase-block-buy-favorite favorite__add-favorite-btn"
            >
              Удалить
            </button>
            <button
              disabled={idCart === id}
              onClick={addBroomToCart}
              className={
                idCart === id
                  ? "broom__item-purchase-block-buy-cart favorite__add-buy-btn--active"
                  : "broom__item-purchase-block-buy-cart favorite__add-buy-btn"
              }
            >
              {idCart === id ? "В корзине" : "Купить"}
            </button>
          </div>
        </div>
      </li>
    </>
  );
}

export default FavoriteItem;
