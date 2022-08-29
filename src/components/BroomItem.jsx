import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../redux/slices/cartSlice";
import {
  addItemToFavorite,
  removeItemToFavorite,
} from "../redux/slices/favoriteSlice";
import { useState } from "react";
import Modal from "./Modal/Modal";

function BroomItem({
  id,
  title,
  description,
  imageUrl,
  price,
  rating,
  subDescription,
}) {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) =>
    state.cart.items.find((obj) => obj.id === id)
  );
  const favoriteItem = useSelector((state) =>
    state.favorite.itemsFavorite.find((obj) => obj.id === id)
  );

  const [open, setOpen] = useState(false);

  const item = {
    id,
    title,
    description,
    imageUrl,
    price,
    rating,
  };

  const img = (imgName) => {
    return require(`../assets/img/goods/${imgName}`);
  };

  const addedCountCart = cartItem ? cartItem.count : 0;
  const addedCountFavorite = favoriteItem ? favoriteItem.id : 0;

  const addBroomToCart = () => {
    dispatch(addItem(item));
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
        <div onClick={() => setOpen(true)} className="broom__item-top-block">
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
            <span className="broom__item-purchase-block-price">{price} ₽</span>
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
              className="broom__item-purchase-block-buy-cart"
              onClick={addBroomToCart}
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
      <Modal open={open} onClose={() => setOpen(false)}>
        <button onClick={() => setOpen(false)} className="popup__close-btn">
          <svg
            className="popup__close-btn-img"
            width="17px"
            height="17px"
            viewBox="0 0 17 17"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              id="Icons"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
              strokeLinecap="round"
            >
              <g
                id="24-px-Icons"
                transform="translate(-364.000000, -124.000000)"
                stroke="#000000"
              >
                <g id="ic_cancel" transform="translate(360.000000, 120.000000)">
                  <g transform="translate(5.000000, 5.000000)" strokeWidth="2">
                    <path d="M0,0 L14.1421356,14.1421356" id="Line"></path>
                    <path d="M14,0 L1.77635684e-15,14" id="Line"></path>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </button>
        <img className="broom__modal-img" src={img(imageUrl)} alt="broom" />
        <p className="broom__modal-title">{title}</p>
        <p className="broom__modal-sub-description">{subDescription}</p>
      </Modal>
    </div>
  );
}

export default BroomItem;
