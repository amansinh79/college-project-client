import React from "react";
import { Link } from "@reach/router";
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import Cookies from "js-cookie";

export default function Header() {
  return (
    <header className="relative border-b-2 border-gray-500">
      <nav aria-label="Top">
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="lg:flex lg:flex-1 lg:items-center">
                <Link to="/">
                  <span className="sr-only">Your Company</span>
                  <img className="h-8 w-auto" src="mark.svg" alt="" />
                </Link>
              </div>

              <div className="flex flex-1 items-center justify-end">
                <div className="flex items-center lg:ml-8">
                  <div className="ml-4 flow-root lg:ml-8">
                    <Link
                      className="group-m-2 flex items-center p-2"
                      to="/search"
                    >
                      <MagnifyingGlassIcon
                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                        Search
                      </span>
                    </Link>
                  </div>

                  <div className="ml-4 flow-root lg:ml-8">
                    <Link
                      className="group-m-2 flex items-center p-2"
                      to="/cart"
                    >
                      <ShoppingBagIcon
                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                        Cart (
                        {
                          JSON.parse(localStorage.getItem("cart") || "[]")
                            .length
                        }
                        )
                      </span>
                    </Link>
                  </div>

                  <div className="ml-4 flow-root lg:ml-8">
                    <span className="group-m-2 flex items-center p-2">
                      {Cookies.get("auth_token") ? (
                        <Link to="/myaccount">
                          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                            My Account
                          </span>
                        </Link>
                      ) : (
                        <Link to="/login">
                          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                            Login
                          </span>
                        </Link>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
