import { useDispatch, useSelector } from "react-redux";
import { removeItemToFavorite } from "../redux/slices/favoriteSlice";
import {addItem, CartItemArgs} from "../redux/slices/cartSlice";
import { useAuth } from "../hooks/use-auth";
import { FC } from "react";
import { RootState } from "../redux/store";

type FavoriteItemProps = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  rating: number;
};

const FavoriteItem: FC<FavoriteItemProps> = ({
  id,
  title,
  imageUrl,
  price,
  rating,
  description,
}) => {
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((obj) => obj.id === id)
  );
  const dispatch = useDispatch();
  const { isAuth } = useAuth();

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
    dispatch(addItem(item as CartItemArgs));
  };

  const onClickDelete = () => {
    dispatch(removeItemToFavorite(id));
  };

  const imgRequire = (imgName: string) => {
    return require(`../assets/img/goods/${imgName}`);
  };

  return (
    <>
      <li className="broom__item">
        <img
          className="broom__item-img favorite__broom-item-img"
          src={imgRequire(imageUrl)}
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
            <span className="broom__item-purchase-block-price">{price} </span>
          </div>
          <div className="broom__item-purchase-block-buy">
            <button
              onClick={onClickDelete}
              className="broom__item-purchase-block-buy-favorite favorite__add-favorite-btn"
            >
              Удалить
            </button>
            <button
              onClick={addBroomToCart}
              disabled={!isAuth || idCart === id}
              className={
                !isAuth
                  ? "favorite__add-buy-btn--disabled"
                  : idCart === id
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
};

export default FavoriteItem;
