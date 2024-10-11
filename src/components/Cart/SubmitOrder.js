import styles from "./SubmitOrder.module.css";
import useInput from "../hooks/useInput";

const SubmitOrder = function (props) {
  const nameInput = useInput((value) => value.trim() !== "");
  const emailInput = useInput((value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  );
  const addressInput = useInput((value) => value.trim() !== "");

  const isFormValid =
    nameInput.isValid && emailInput.isValid && addressInput.isValid;

  const SubmitOrder = (e) => {
    e.preventDefault();
    props.onSubmit({
      name: nameInput.value,
      email: emailInput.value,
      address: addressInput.value,
    });
  };

  return (
    <form className={`${styles.form}`} onSubmit={SubmitOrder}>
      <div className={`${styles.control}`}>
        <label htmlFor="name">Введите имя</label>
        <input
          type="text"
          id="name"
          onBlur={nameInput.clickHandler}
          onInput={nameInput.enterHandler}
          value={nameInput.value}
        />
        {nameInput.isClicked && !nameInput.isValid && (
          <p>*Обязательно для заполнения!</p>
        )}
      </div>
      <div className={`${styles.control}`}>
        <label htmlFor="email">Введите почту</label>
        <input
          type="text"
          id="email"
          onBlur={emailInput.clickHandler}
          onInput={emailInput.enterHandler}
          value={emailInput.value}
        />
        {emailInput.isClicked && !emailInput.isValid && (
          <p>*Введите корректный email!</p>
        )}
      </div>
      <div className={`${styles.control}`}>
        <label htmlFor="address">Введите адрес</label>
        <input
          type="text"
          id="address "
          onBlur={addressInput.clickHandler}
          onInput={addressInput.enterHandler}
          value={addressInput.value}
        />
        {addressInput.isClicked && !addressInput.isValid && (
          <p>*Обязательно для заполнения!</p>
        )}
      </div>
      <div className={`${styles.actions}`}>
        {
          <button disabled={!isFormValid} className={`${styles.submit}`}>
            Подтвердить заказ
          </button>
        }
        <button type="button" onClick={props.onCancel}>
          Отмена
        </button>
      </div>
    </form>
  );
};

export default SubmitOrder;
