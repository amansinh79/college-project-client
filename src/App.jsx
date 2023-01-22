import { Router } from "@reach/router";
import { useState, useEffect } from "react";
import Cart from "./pages/Cart";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Main from "./pages/Main";
import ResetPassword from "./pages/ResetPassword";
import Signup from "./pages/Signup";
import Product from "./pages/Product";
import OrderHistory from "./pages/OrderHistory";
import MyAccount from "./pages/MyAccount";
import Search from "./pages/Search";

export const ScrollToTop = ({ children, location }) => {
  useEffect(() => window.scrollTo(0, 0), [location.pathname]);
  return children;
};

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop path="/">
          <Main path="/" />
          <Cart path="/cart" />
          <Product path="/product" />
          <Login path="/login" />
          <Search path="/search" />
          <Signup path="/signup" />
          <MyAccount path="/myaccount" />
          <OrderHistory path="orderhistory" />
          <ForgotPassword path="/forgotpassword" />
          <ResetPassword path="/resetpassword" />
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;
