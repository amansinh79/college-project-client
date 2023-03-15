import { Redirect } from "@reach/router";
import { Link } from "@reach/router";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function OrderPlaced(props) {
  if (!props.location.state.orderid) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Header />
      <main className="relative lg:min-h-full">
        <div className="h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
          <img
            src="confirmation-page-06-hero.jpg"
            alt="TODO"
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div>
          <div className="mx-auto max-w-2xl py-16 px-4 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24">
            <div className="lg:col-start-2">
              <h1 className="text-sm font-medium text-gray-600">
                Order Placed!
              </h1>
              <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Thanks for ordering
              </p>
              <p className="mt-2 text-base text-gray-500">
                We have placed your order and will be delivering it to you in
                7-10 business days.
              </p>

              <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 md:text-3xl">
                Order ID{" "}
                <span className="text-gray-500">
                  #{props.location.state.orderid}
                </span>
              </p>

              <div className="mt-16 border-t border-gray-200 py-6 text-left">
                <Link
                  to="/orderhistory"
                  className="text-sm font-medium text-gray-600 hover:text-gray-500"
                >
                  Order History <span aria-hidden="true"> &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
