//import { Fragment } from "react";
import Header from "./components/Layout/Header";
import Container from "./components/Container/Container";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import { useState } from "react";

function App() {
  const [cartIsVisible, setCartIsVisible] = useState(false);

  const cartVisibilityHandler = () => {
    setCartIsVisible(true);
  };

  const cartHideHandler = () => {
    setCartIsVisible(false);
  };

  return (
    <Container>
      {cartIsVisible && <Cart onHideCart={cartHideHandler} />}
      <Header onShowCart={cartVisibilityHandler} />
      <main>
        <Meals />
      </main>
    </Container>
  );
}

export default App;
