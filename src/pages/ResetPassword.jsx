import { navigate } from "@reach/router";
import { useLocation } from "@reach/router";
import queryString from "query-string";
import api from "../utils/api";

export default function ResetPassword() {
  const location = useLocation();
  const { token, userid } = queryString.parse(location.search);

  if (!token || !userid) {
    return <div>Invalid Link</div>;
  }
  return (
    <>
      <div className=" min-h-full h-screen w-screen">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-12 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=gray&shade=600"
                alt="Your Company"
              />
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                Reset Password
              </h2>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form action="#" method="POST" className="space-y-6">
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password{" "}
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="password"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="confirmpassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm Password{" "}
                    </label>
                    <div className="mt-1">
                      <input
                        id="confirmpassword"
                        name="confirmpassword"
                        type="password"
                        autoComplete="confirmpassword"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      onClick={async (e) => {
                        e.preventDefault();
                        const password =
                          document.getElementById("password").value;
                        const confirmpassword =
                          document.getElementById("confirmpassword").value;
                        if (password !== confirmpassword) {
                          alert("Password doesn't match");
                          return;
                        }

                        const res = await api.resetPassword(
                          password,
                          token,
                          userid
                        );

                        if (res) {
                          alert("Password Reset Successfully");
                          navigate("/login");
                        } else {
                          alert("Password Reset Failed");
                        }
                      }}
                    >
                      Reset Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
