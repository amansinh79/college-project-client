import api from "./api";

const addToCart = (productid, size) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = cart.find(
    (item) => item.productid === productid && item.size === size
  );

  if (product) {
    alert("Product already in cart");
    return;
  }

  cart.push({ productid, size, quantity: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
};

const changeQuantity = (productid, size, quantity) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = cart.find(
    (item) => item.productid === productid && item.size === size
  );

  if (!product) {
    alert("Product not in cart");
    return;
  }

  product.quantity = quantity;

  localStorage.setItem("cart", JSON.stringify(cart));
};

const removeFromCart = (productid, size) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = cart.find(
    (item) => item.productid === productid && item.size === size
  );

  if (!product) {
    alert("Product not in cart");
    return;
  }

  const index = cart.indexOf(product);
  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));
};

const placeOrder = async () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  const res = await api.addOrder(cart);

  localStorage.removeItem("cart");

  return res;
};

export default {
  addToCart,
  changeQuantity,
  removeFromCart,
  placeOrder,
};
