import { useSelector, useDispatch } from "react-redux";
import {addItem, CartItemArgs} from "../redux/slices/cartSlice";
import {
  addItemToFavorite,
  removeItemToFavorite,
} from "../redux/slices/favoriteSlice";
import { FC, useState } from "react";
import Modal from "./Modal/Modal";
import { useAuth } from "../hooks/use-auth";
import { AppDispatch, RootState } from "../redux/store";

type BroomItemProps = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  rating: number;
  subDescription: string;
};

const BroomItem: FC<BroomItemProps> = ({
  id,
  title,
  description,
  imageUrl,
  price,
  rating,
  subDescription,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((obj) => obj.id === id)
  );
  const favoriteItem = useSelector((state: RootState) =>
    state.favorite.itemsFavorite.find((obj) => obj.id === id)
  );
  const { isAuth } = useAuth();

  const [openPopupBroom, setOpenPopupBroom] = useState<boolean>(false);

  const item = {
    id,
    title,
    description,
    imageUrl,
    price,
    rating,
  };

  const img = (imgName: string) => {
    return require(`../assets/img/goods/${imgName}`);
  };

  const addedCountCart = cartItem ? cartItem.count : 0;
  const addedCountFavorite = favoriteItem ? favoriteItem.id : 0;

  const addBroomToCart = () => {
    dispatch(addItem(item as CartItemArgs));
  };

  const addBroomToFavorite = () => {
    if (addedCountFavorite !== id) {
      dispatch(addItemToFavorite(item));
    } else {
      dispatch(removeItemToFavorite(addedCountFavorite));
    }
  };

  return (
    <div>
      <li className="broom__item">
        <div
          onClick={() => setOpenPopupBroom(true)}
          className="broom__item-top-block"
        >
          <img className="broom__item-img" src={img(imageUrl)} alt="broom" />
          <p className="broom__item-title">{title}</p>
          <p className="broom__item-description">{description}</p>
        </div>
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
              className={
                addedCountFavorite === id
                  ? "broom__item-purchase-block-buy-favorite--active"
                  : "broom__item-purchase-block-buy-favorite"
              }
              onClick={addBroomToFavorite}
            >
              {addedCountFavorite > 0 ? "В избранном" : "В избранное"}
            </button>
            <button
              className={
                isAuth
                  ? "broom__item-purchase-block-buy-cart"
                  : "broom__item-purchase-block-buy-cart--disabled"
              }
              onClick={addBroomToCart}
              disabled={!isAuth}
            >
              {addedCountCart > 0 ? "В корзине" : "В корзину"}

              <b
                className={
                  addedCountCart > 0
                    ? "buy__btn-count--active"
                    : "buy__btn-count"
                }
              >
                {addedCountCart}
              </b>
            </button>
          </div>
        </div>
      </li>
      <Modal open={openPopupBroom} onClose={() => setOpenPopupBroom(false)}>
        <img className="broom__modal-img" src={img(imageUrl)} alt="broom" />
        <p className="broom__modal-title">{title}</p>
        <p className="broom__modal-sub-description">{subDescription}</p>
      </Modal>
    </div>
  );
};

export default BroomItem;
