import Cookies from "js-cookie";

const endpoint = "http://localhost:3000";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  auth_token: Cookies.get("auth_token"),
};

const login = async (username, password) => {
  const res = await fetch(`${endpoint}/login`, {
    method: "POST",
    headers,
    body: JSON.stringify({ username, password }),
  });

  if (res.status === 200) {
    Cookies.set("auth_token", res.headers.get("auth_token"));
    return true;
  } else {
    return false;
  }
};

const signup = async (username, email, password) => {
  const res = await fetch(`${endpoint}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ username, email, password }),
  });

  return await res.text();
};

const getTrendingProducts = async () => {
  const res = await fetch(`${endpoint}/trending_products`, {
    method: "GET",
    headers,
  });

  return await res.json();
};

const getProductBySlug = async (slug) => {
  const res = await fetch(`${endpoint}/product/${slug}`, {
    method: "GET",
    headers,
  });

  return await res.json();
};

const getProductById = async (id) => {
  const res = await fetch(`${endpoint}/product/${id}`, {
    method: "GET",
    headers,
  });
  return await res.json();
};

const addOrder = async (order) => {
  const res = await fetch(`${endpoint}/add_order`, {
    method: "POST",
    headers,
    body: JSON.stringify(order),
  });

  return await res.json();
};

const isUserInfoFilled = async () => {
  const res = await fetch(`${endpoint}/is_user_info_filled`, {
    method: "GET",
    headers,
  });

  if (res.status === 200) {
    return await res.json();
  } else {
    return false;
  }
};

const cancelOrder = async (id) => {
  const res = await fetch(`${endpoint}/cancel_order`, {
    method: "DELETE",
    headers,
    body: JSON.stringify({ id }),
  });

  return await res.json();
};

const getOrders = async () => {
  const res = await fetch(`${endpoint}/get_orders`, {
    method: "GET",
    headers,
  });

  return res.ok;
};

const getProducts = async (query) => {
  const res = await fetch(`${endpoint}/products?${query}`, {
    method: "GET",
    headers,
  });

  return await res.json();
};

const getRelatedProducts = async (id) => {
  const res = await fetch(`${endpoint}/related_products/`);

  return await res.json();
};

const forgotPassword = async (email) => {
  const res = await fetch(`${endpoint}/forgot_password`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email }),
  });

  return res.ok;
};

const resetPassword = async (password, token, userid) => {
  const res = await fetch(`${endpoint}/reset_password`, {
    method: "POST",
    headers,
    body: JSON.stringify({ password, token, userid }),
  });

  return res.ok;
};

const updateUserInfo = async (data) => {
  const res = await fetch(`${endpoint}/update_user_info`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  return res.ok;
};

const getUserInfo = async () => {
  const res = await fetch(`${endpoint}/get_user_info`, {
    method: "GET",
    headers,
  });

  if (res.ok) {
    return await res.json();
  }
  return {};
};

export default {
  getUserInfo,
  updateUserInfo,
  resetPassword,
  getOrders,
  getTrendingProducts,
  login,
  signup,
  getProductBySlug,
  getProductById,
  addOrder,
  isUserInfoFilled,
  cancelOrder,
  getProducts,
  getRelatedProducts,
  forgotPassword,
};
