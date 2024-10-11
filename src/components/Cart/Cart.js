import style from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext, useState } from "react";
import CartContext from "../../store/CartContext";
import CartItem from "./CartItem";
import itemstyle from "./CartItem.module.css";
import SubmitOrder from "./SubmitOrder";
import React from "react";

const Cart = function (props) {
  const cartContext = useContext(CartContext);
  const [isSubmitOrder, setIsSubmitOrder] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setErorr] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalAmount = `$${Math.abs(cartContext.totalAmount).toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const removeCartItemHandler = (id) => {
    cartContext.removeItem(id);
  };

  const addCartItemHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const OrderHandler = () => {
    setIsSubmitOrder(true);
  };

  const submitOrderHandler = async (userData) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://sushiapp-3c0b7-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderedMeals: cartContext.items,
            totalAmount: totalAmount,
          }),
        }
      );
      if (!response.ok) throw new Error("Что-то пошло не так...");
      setIsLoading(false);
      cartContext.clearCart();
      setIsSubmitted(true);
    } catch (err) {
      setIsLoading(false);
      setErorr(err.message);
    }
  };

  const cartItems = (
    <ul
      style={{
        overflowY: "auto",
        maxHeight: "20rem",
        listStyle: "none",
        paddingLeft: "0",
      }}
    >
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={addCartItemHandler.bind(null, item)}
          onRemove={removeCartItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const contentModal = (
    <React.Fragment>
      {!isSubmitted && (
        <div className={style.total}>
          <span>Итого</span>
          <span>{totalAmount}</span>
        </div>
      )}
      {error && <p className={`${style.error}`}>Ошибка: {error}</p>}
      {isLoading && (
        <p className={`${style.loading}`}>Отправка вашего заказа...</p>
      )}
      {!isLoading && !error && isSubmitOrder && !isSubmitted && (
        <SubmitOrder
          onCancel={props.onHideCart}
          onSubmit={submitOrderHandler}
        />
      )}
      {isSubmitted && (
        <React.Fragment>
          <p className={`${style["sumbitted-message"]}`}>
            Ваш заказ успешно отправлен! Он будет готов в течении 30 минут. Чек
            на заказ отправлен на указанную почту.
          </p>
          <button
            className={`${style["button--alt"]}`}
            style={{ marginLeft: "auto", display: "block" }}
            onClick={props.onHideCart}
          >
            Закрыть
          </button>
        </React.Fragment>
      )}
      {!isSubmitOrder && (
        <div className={style.actions}>
          <button
            className={`${style["button--alt"]}`}
            onClick={props.onHideCart}
          >
            Закрыть
          </button>
          {hasItems && (
            <button className={style.button} onClick={OrderHandler}>
              Заказать
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {!isSubmitted && cartItems}
      {contentModal}
    </Modal>
  );
};

export default Cart;
