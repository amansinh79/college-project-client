import React from "react";
import api from "../utils/api";

export default function Footer() {
  return (
    <footer aria-labelledby="footer-heading" className="bg-gray-50">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 py-20">
          <div className="flex justify-between divide-x">
            <div className="mx-auto">
              <div className="col-span-1 md:col-span-2 lg:col-start-1 lg:row-start-1">
                <img src="mark.svg" alt="" className="h-8 w-auto" />
              </div>
            </div>

            <div className="px-10 md:col-span-8 md:col-start-3 md:row-start-2 md:mt-0 lg:col-span-4 lg:col-start-9 lg:row-start-1">
              <h3 className="text-base font-medium text-gray-900">
                Give your feedback{" "}
              </h3>
              <p className="mt-6 text-sm text-gray-500">
                you can express your thoughts on any of our products or
                services.
              </p>
              <form className="mt-2 sm:max-w-md">
                <textarea
                  id="feedback"
                  type="text"
                  required
                  rows={4}
                  placeholder="Your feedback"
                  className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white py-2 px-4 text-sm text-gray-900 placeholder-gray-500 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
                <div className="mt-2 flex-shrink-0">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    onClick={async (e) => {
                      e.preventDefault();

                      const feedback =
                        document.getElementById("feedback").value;

                      if (feedback === "") {
                        alert("Please enter your feedback");
                        return;
                      }
                      const res = await api.createFeedback(feedback);
                      console.log(res);
                      if (res) {
                        alert("Thank you for your feedback");
                      } else {
                        alert("You need to login to be able to send feedback");
                      }
                    }}
                  >
                    Submit{" "}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 py-10 text-center">
          <p className="text-sm text-gray-500">
            &copy; 2021 Your Company, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
