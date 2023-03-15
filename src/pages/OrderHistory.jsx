import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "@reach/router";
import api from "../utils/api";
import { useQuery, useQueryClient } from "react-query";

export default function OrderHistory() {
  const queryClient = useQueryClient();
  const {
    data: orders,
    isError,
    error,
    isLoading,
  } = useQuery("orders", api.getOrders);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-white">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:pt-24 sm:pb-32 lg:px-8">
        <div className="max-w-xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Your Orders
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Check the status of recent orders, cancel orders, and more.
          </p>
        </div>

        {orders.length === 0 && (
          <div className="mt-12 space-y-16 sm:mt-16 divide-black divide-y">
            <section aria-labelledby="order-heading">
              <div className="space-y-1 mt-10 md:flex md:items-baseline md:space-y-0 md:space-x-4">
                <h2
                  id="order-heading"
                  className="text-lg font-medium text-gray-600 md:flex-shrink-0"
                >
                  You have not ordered anything yet.
                </h2>
              </div>
            </section>
          </div>
        )}
        <div className="mt-12 space-y-16 sm:mt-16 divide-black divide-y">
          {orders.map((order) => (
            <section key={order.id} aria-labelledby={`${order.id}-heading`}>
              <div className="space-y-1 mt-10 md:flex md:items-baseline md:space-y-0 md:space-x-4">
                <h2
                  id={`${order.id}-heading`}
                  className="text-lg font-medium text-gray-900 md:flex-shrink-0"
                >
                  Order #{order.id}
                </h2>
                <div className="space-y-5 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 md:min-w-0 md:flex-1">
                  <div></div>
                  <div className="mt-6 space-y-4 sm:mt-0 sm:ml-6 sm:w-40 sm:flex-none">
                    {order.status === "Placed" && (
                      <button
                        type="button"
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-600 py-2 px-2.5 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:w-full sm:flex-grow-0"
                        onClick={async (e) => {
                          e.preventDefault();
                          const res = await api.cancelOrder(order.id);
                          if (res) {
                            alert("Order has been cancelled");
                            queryClient.invalidateQueries("orders");
                          } else {
                            alert("something went wrong");
                          }
                        }}
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 -mb-6 flow-root divide-y divide-gray-200 border-t border-gray-200">
                {order.products.map((product) => (
                  <div
                    key={product.id + order.id + product.size}
                    className="py-6 sm:flex"
                  >
                    <div className="flex space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8">
                      <img
                        src={import.meta.env.VITE_SERVER + product.thumbnail}
                        className="h-20 w-20 flex-none rounded-md object-cover object-center sm:h-48 sm:w-48"
                      />
                      <div className="min-w-0 flex flex-col gap-2 pt-1.5 sm:pt-0">
                        <h3 className="text-sm font-medium text-gray-900">
                          <Link to={"/product/" + product.slug}>
                            {product.name}
                          </Link>
                        </h3>
                        <p className="truncate text-sm text-gray-500">
                          Size : <span>{product.size}</span>
                        </p>
                        <p className=" text-sm text-gray-500">
                          Quantity : {product.quantity}
                        </p>
                        <p className="mt-1 font-medium text-gray-900">
                          ₹ {product.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="pt-3 flex justify-between">
                  <p className="text-lg font-medium text-gray-600">
                    Status : {order.status}
                  </p>
                  <p className="text-lg font-medium text-gray-600">
                    Total : ₹ {order.total}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
