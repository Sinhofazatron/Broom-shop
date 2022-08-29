import Header from "./components/Header";
import FooterRightReserved from "./components/FooterRightReserved";
import Home from "./pages/Home";

import "./scss/style.scss";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Cart from "./pages/Cart";
import Favorite from "./pages/Favorite";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <main className="main">
        <div className="main__container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </main>
      <footer className="footer">
        <FooterRightReserved />
      </footer>
    </div>
  );
}

export default App;
