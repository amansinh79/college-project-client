import { Link } from "@reach/router";
import React from "react";
import { useQuery } from "react-query";
import api from "../utils/api";

export default function AlsoPurchased() {
  const {
    data: relatedProducts,
    isLoading: isLoading2,
    isError: isError2,
    error: error2,
  } = useQuery("relatedProducts", () => api.getRelatedProducts());

  if (isLoading2) return <div>Loading...</div>;

  if (isError2) return <div>Error: {error2.message}</div>;

  return (
    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {relatedProducts.map((relatedProduct) => (
        <div key={relatedProduct.id} className="group relative">
          <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:aspect-none lg:h-80">
            <img
              src={import.meta.env.VITE_SERVER + relatedProduct.thumbnail}
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                <Link replace to={"/product/" + relatedProduct.slug}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {relatedProduct.name}
                </Link>
              </h3>
            </div>
            <p className="text-sm font-medium text-gray-900">
              ₹ {relatedProduct.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
