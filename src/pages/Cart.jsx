import { useState } from "react";
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XMarkIcon as XMarkIconMini,
} from "@heroicons/react/20/solid";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useQuery, useQueryClient } from "react-query";
import api from "../utils/api";
import { Link } from "@reach/router";
import cart from "../utils/cart";
import { navigate } from "@reach/router";
import Cookies from "js-cookie";
import AlsoPurchased from "../components/AlsoPurchased";

export default function Cart() {
  const [total, setTotal] = useState(0);
  const queryClient = useQueryClient();
  const [ordetTotal, setOrderTotal] = useState(0);
  const {
    data: products,
    error,
    isLoading,
    isError,
  } = useQuery("cart", async () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const productsInCart = await Promise.all(
      cart.map(async (item) => {
        const product = await api.getProductById(item.productid);
        return { ...item, ...product };
      })
    );

    const total = productsInCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    setTotal(total);
    setOrderTotal(total + 70);
    return productsInCart;
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-white">
      <Header />

      <main className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        {products.length > 0 ? (
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul
                role="list"
                className="divide-y divide-gray-200 border-t border-b border-gray-200"
              >
                {products.map((product, productIdx) => (
                  <li
                    key={product.id + product.size}
                    className="flex py-6 sm:py-10"
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={product.thumbnail}
                        className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <Link
                                to={"/product/" + product.slug}
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {product.name}
                              </Link>
                            </h3>
                          </div>
                          <div className="mt-1 flex text-sm">
                            {product.size ? (
                              <p className=" text-gray-500">
                                Size : {product.size}
                              </p>
                            ) : null}
                          </div>
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            ₹ {product.price}
                          </p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          <label
                            htmlFor={`quantity-${productIdx}`}
                            className="sr-only"
                          >
                            Quantity, {product.name}
                          </label>
                          <select
                            id={`quantity-${productIdx}`}
                            name={`quantity-${productIdx}`}
                            className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                            onChange={(e) => {
                              e.preventDefault();
                              cart.changeQuantity(
                                product.id,
                                product.size,
                                parseInt(e.target.value)
                              );
                              queryClient.invalidateQueries("cart");
                            }}
                            defaultValue={product.quantity}
                          >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                          </select>

                          <div className="absolute top-0 right-0">
                            <button
                              type="button"
                              className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                              onClick={(e) => {
                                e.preventDefault();
                                cart.removeFromCart(product.id, product.size);
                                queryClient.invalidateQueries("cart");
                              }}
                            >
                              <span className="sr-only">Remove</span>
                              <XMarkIconMini
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>

                      <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                        {product.inStock ? (
                          <CheckIcon
                            className="h-5 w-5 flex-shrink-0 text-green-500"
                            aria-hidden="true"
                          />
                        ) : (
                          <ClockIcon
                            className="h-5 w-5 flex-shrink-0 text-gray-300"
                            aria-hidden="true"
                          />
                        )}

                        <span>In stock</span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
            >
              <h2
                id="summary-heading"
                className="text-lg font-medium text-gray-900"
              >
                Order summary
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ₹ {total}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="flex items-center text-sm text-gray-600">
                    <span>Shipping estimate</span>
                    <a
                      href="#"
                      className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">
                        Learn more about how shipping is calculated
                      </span>
                      <QuestionMarkCircleIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </a>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">₹ 50.00</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="flex text-sm text-gray-600">
                    <span>Tax estimate</span>
                    <a
                      href="#"
                      className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">
                        Learn more about how tax is calculated
                      </span>
                      <QuestionMarkCircleIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </a>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">₹ 20.00</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">
                    Order total
                  </dt>
                  <dd className="text-base font-medium text-gray-900">
                    ₹ {ordetTotal}
                  </dd>
                </div>
              </dl>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-gray-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  onClick={async (e) => {
                    e.preventDefault();

                    if (Cookies.get("auth_token") === undefined) {
                      alert("You need to login to place order");
                      return;
                    }
                    console.log(await api.isUserInfoFilled());
                    if (!(await api.isUserInfoFilled())) {
                      const isRedirect = confirm(
                        "Please fill your user info first, press OK to fill info or cancel to fill info later"
                      );

                      if (isRedirect) {
                        navigate("/myaccount");
                      }
                      return;
                    }

                    const res = await cart.placeOrder();
                    if (res) {
                      queryClient.invalidateQueries("cart");
                      navigate("/orderplaced", { state: { orderid: res.id } });
                    } else {
                      alert("Something went wrong");
                    }
                  }}
                >
                  Place Order
                </button>
              </div>
            </section>
          </form>
        ) : (
          <div className="text-center my-20 py-10 border-t border-b border-gray-200">
            <h1 className="text-3xl font-bold">Your cart is empty!</h1>
            <Link to="/">
              <p className="text-blue-500 pt-5">Continue Shopping</p>
            </Link>
          </div>
        )}

        <section aria-labelledby="related-heading" className="mt-16 sm:mt-24">
          <h2
            id="related-heading"
            className="text-lg font-medium text-gray-900"
          >
            Customers also purchased
          </h2>

          <AlsoPurchased />
        </section>
      </main>

      <Footer />
    </div>
  );
}
