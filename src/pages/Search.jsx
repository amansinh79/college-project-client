import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "@reach/router";
import { useState } from "react";
import queryString from "query-string";
import api from "../utils/api";
import { useQuery, useQueryClient } from "react-query";
import { useEffect } from "react";

const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "men", label: "Men" },
      { value: "women", label: "Women" },
    ],
  },
];

let query = {};

export default function Search(props) {
  const queryClient = useQueryClient();
  const [price, setPrice] = useState(500);
  const {
    data: products,
    isError,
    error,
    isLoading,
  } = useQuery("Products", async () => {
    if (props.location.state.slug && !query.category) {
      query.category = props.location.state.slug;
    }
    if (Object.entries(query).length > 0) {
      return await api.getProducts(queryString.stringify(query));
    } else {
      return [];
    }
  });

  useEffect(() => {
    return () => {
      query = {};
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="bg-white">
      <Header />
      <div>
        <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
          <div className="border-b border-gray-200 pt-24 pb-10 lg:gap-48 gap-10 flex lg:flex-row flex-col justify-between">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Search
            </h1>
            <div className="flex w-full">
              <input
                id="search"
                type="text"
                autoComplete="search"
                required
                className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white py-2 px-4 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
              <div className="ml-4 flex-shrink-0">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  onClick={(e) => {
                    e.preventDefault();
                    const search = document.getElementById("search").value;
                    query.search_query = search;
                    queryClient.invalidateQueries("Products");
                  }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <aside>
              <div className="">
                <form className="space-y-10 divide-y divide-gray-200">
                  {filters.map((section, sectionIdx) => (
                    <div
                      key={section.name}
                      className={sectionIdx === 0 ? null : "pt-10"}
                    >
                      <fieldset>
                        <legend className="block text-sm font-medium text-gray-900">
                          {section.name}
                        </legend>
                        <div className="space-y-3 pt-6">
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <input
                                id={`${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                defaultValue={option.value}
                                type="radio"
                                className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                                defaultChecked={
                                  option.value === props.location.state.slug ||
                                  false
                                }
                                onChange={(e) => {
                                  query.category = e.target.value;
                                  queryClient.invalidateQueries("Products");
                                }}
                              />
                              <label
                                htmlFor={`${section.id}-${optionIdx}`}
                                className="ml-3 text-sm text-gray-600"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                  ))}
                  <div className="pt-8">
                    <legend className="flex justify-between text-sm font-medium text-gray-900 pb-2">
                      Price <span>{price}</span>
                    </legend>
                    <input
                      type="range"
                      min={500}
                      max={5000}
                      step={500}
                      className="accent-gray-600 w-full h-6 p-0 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none"
                      id="range"
                      defaultValue={price}
                      onChange={(e) => {
                        setPrice(e.target.value);
                        query.price = e.target.value;
                        queryClient.invalidateQueries("Products");
                      }}
                    />
                  </div>
                </form>
              </div>
            </aside>

            <section
              aria-labelledby="product-heading"
              className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3"
            >
              <h2 id="product-heading" className="sr-only">
                Products
              </h2>

              {products.length > 0 ? (
                <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                    >
                      <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                        <img
                          src={import.meta.env.VITE_SERVER + product.thumbnail}
                          className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                        />
                      </div>
                      <div className="flex flex-1 flex-col space-y-2 p-4">
                        <h3 className="text-sm font-medium text-gray-900">
                          <Link to={"/product/" + product.slug}>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {product.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-500">
                          {product.description.slice(0, 100) + "..."}
                        </p>
                        <div className="flex flex-1 flex-col justify-end">
                          <p className="text-base font-medium text-gray-900">
                            ₹ {product.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center w-full text-2xl font-bold">
                  <p>No products found! Try using different filters</p>
                </div>
              )}
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
