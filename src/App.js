//import { Fragment } from "react";
import Header from "./components/Layout/Header";
import Container from "./components/Container/Container";
import Meals from "./components/Meals/Meals";

function App() {
  return (
    <Container>
      <Header></Header>
      <main>
        <Meals />
      </main>
    </Container>
  );
}

export default App;
