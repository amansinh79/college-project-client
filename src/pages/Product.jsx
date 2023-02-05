import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useQuery, useQueryClient } from "react-query";
import api from "../utils/api";
import cart from "../utils/cart";
import AlsoPurchased from "../components/AlsoPurchased";

const sizes = [
  { name: "XXS" },
  { name: "XS" },
  { name: "S" },
  { name: "M" },
  { name: "L" },
  { name: "XL" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product(props) {
  const queryClient = useQueryClient();
  const {
    data: product,
    error,
    isLoading,
    isError,
  } = useQuery("product", () => api.getProductBySlug(props.slug));

  const [selectedSize, setSelectedSize] = useState(sizes[2]);

  useEffect(() => {
    queryClient.prefetchQuery("product", () =>
      api.getProductBySlug(props.slug)
    );
    queryClient.prefetchQuery("relatedProducts", () =>
      api.getRelatedProducts()
    );
  }, [props.slug]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-white">
      <Header />
      <main className="mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="flex justify-between">
              <h1 className="text-xl font-medium text-gray-900">
                {product.name}
              </h1>
              <p className="text-xl font-medium text-gray-900">
                ₹ {product.price}
              </p>
            </div>
          </div>

          {/* Image gallery */}
          <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1">
            <h2 className="sr-only">Images</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {product.Attachments.map((image) => (
                <img key={image.id} src={image.url} className={"rounded-lg"} />
              ))}
            </div>
          </div>

          <div className="mt-8 lg:col-span-5">
            <form>
              {/* Size picker */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-medium text-gray-900">Size</h2>
                </div>

                <RadioGroup
                  value={selectedSize}
                  onChange={setSelectedSize}
                  className="mt-2"
                >
                  <RadioGroup.Label className="sr-only">
                    {" "}
                    Choose a size{" "}
                  </RadioGroup.Label>
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                    {sizes.map((size) => (
                      <RadioGroup.Option
                        key={size.name}
                        value={size}
                        className={({ active, checked }) =>
                          classNames(
                            "cursor-pointer focus:outline-none",
                            active ? "ring-2 ring-offset-2 ring-gray-500" : "",
                            checked
                              ? "bg-gray-600 border-transparent text-white hover:bg-gray-700"
                              : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                            "border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1"
                          )
                        }
                      >
                        <RadioGroup.Label as="span">
                          {size.name}
                        </RadioGroup.Label>
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <button
                type="submit"
                className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-600 py-3 px-8 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                onClick={(e) => {
                  e.preventDefault();
                  cart.addToCart(product.id, selectedSize.name);
                }}
              >
                Add to cart
              </button>
            </form>

            {/* Product details */}
            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Description</h2>

              <div
                className="prose prose-sm mt-4 text-gray-500"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          </div>
        </div>

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
