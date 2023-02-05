import { Redirect } from "@reach/router";
import { navigate } from "@reach/router";
import { Link } from "@reach/router";
import Cookies from "js-cookie";
import React from "react";
import { useQuery } from "react-query";
import Footer from "../components/Footer";
import Header from "../components/Header";
import api from "../utils/api";

export default function MyAccount() {
  const {
    data: userInfo,
    error,
    isError,
    isLoading,
  } = useQuery("userinfo", async () => {
    const data = await api.getUserInfo();
    data.expirydate = data.expirydate.slice(0, 7);
    return data;
  });

  if (!Cookies.get("auth_token")) {
    return <Redirect to="/login" />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  console.log(userInfo);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl lg:px-8">
        <section className="lg:pt-24 py-16 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:pb-24">
          <h1 className="text-5xl font-medium text-gray-900 text-center">
            My Account
          </h1>
          <div className="flex mt-16 justify-center gap-10 border-t border-b py-10 border-gray-200">
            <Link to="/orderhistory">
              <div className="rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                Order History
              </div>
            </Link>

            <button
              type="submit"
              className="rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              onClick={(e) => {
                e.preventDefault();
                Cookies.remove("auth_token");
                navigate("/");
              }}
            >
              Logout{" "}
            </button>
          </div>
          <form className="pt-16">
            <div
              id="info"
              className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0"
            >
              <div>
                <h3
                  id="contact-info"
                  className="text-lg font-medium text-gray-900"
                >
                  Contact information
                </h3>

                <div className="mt-6">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      autoComplete="name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                      defaultValue={userInfo.name || ""}
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <label
                    htmlFor="phone-number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone number
                  </label>
                  <div className="mt-1">
                    <input
                      type="tel"
                      id="phone-number"
                      name="phone-number"
                      autoComplete="tel"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                      defaultValue={userInfo.phone || ""}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3
                  id="payment-heading"
                  className="text-lg font-medium text-gray-900"
                >
                  Payment details
                </h3>

                <div className="mt-6 grid grid-cols-3 gap-y-6 gap-x-4 sm:grid-cols-4">
                  <div className="col-span-3 sm:col-span-4">
                    <label
                      htmlFor="card-number"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Card number
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="card-number"
                        name="card-number"
                        autoComplete="cc-number"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                        defaultValue={userInfo.cardnumber || ""}
                      />
                    </div>
                  </div>

                  <div className="col-span-2 sm:col-span-3">
                    <label
                      htmlFor="expiration-date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Expiration date (MM/YY)
                    </label>
                    <div className="mt-1">
                      <input
                        type="month"
                        name="expiration-date"
                        id="expiration-date"
                        autoComplete="cc-exp"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                        defaultValue={userInfo.expirydate || ""}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="cvc"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CVV
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="cvv"
                        id="cvv"
                        autoComplete="csc"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                        defaultValue={userInfo.cvv || ""}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3
                  id="shipping-heading"
                  className="text-lg font-medium text-gray-900"
                >
                  Shipping address
                </h3>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="address"
                        name="address"
                        autoComplete="street-address"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                        defaultValue={userInfo.address || ""}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="city"
                        name="city"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                        defaultValue={userInfo.city || ""}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State / Province
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="state"
                        name="region"
                        autoComplete="address-level1"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                        defaultValue={userInfo.state || ""}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Postal code
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="postal-code"
                        name="postal-code"
                        autoComplete="postal-code"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                        defaultValue={userInfo.postalcode || ""}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex justify-center border-t border-gray-200 pt-6">
                <button
                  type="submit"
                  className="rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  onClick={async (e) => {
                    e.preventDefault();
                    const data = {
                      name: document.getElementById("name").value,
                      phone: document.getElementById("phone-number").value,
                      address: document.getElementById("address").value,
                      city: document.getElementById("city").value,
                      state: document.getElementById("state").value,
                      postalcode: document.getElementById("postal-code").value,
                      cardnumber: document.getElementById("card-number").value,
                      cvv: document.getElementById("cvv").value,
                      expirydate:
                        document.getElementById("expiration-date").value,
                    };

                    const res = await api.updateUserInfo(data);

                    if (res) {
                      alert("info updated");
                    } else {
                      alert("something went wrong");
                    }
                  }}
                >
                  Save{" "}
                </button>
              </div>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
