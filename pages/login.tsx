import { useRef, useContext, useState } from "react";
import { useRouter } from "next/router";

import AuthContext from "../context/auth-context";

type Data = {
  idToken: string;
  email: string;
  error: string;
};

const Auth = () => {
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const authCtx = useContext(AuthContext);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    setErrorMsg(null);
    //add validation
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
      });

      const data: Data = await response.json();
      // console.log(response);

      if (!response.ok) {
        setErrorMsg(data.error);
        // alert(data.error);
        // console.log(data);
      } else {
        const { idToken, email } = data;
        const username = email.substring(0, email.indexOf("@"));
        authCtx.login(idToken, username);
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-sm p-6 mx-auto mt-8 bg-white rounded-lg shadow-lg">
      <form onSubmit={submitHandler}>
        <div className="mb-6 form-group">
          <label
            htmlFor="inputEmail"
            className="inline-block mb-2 text-gray-700 form-label"
          >
            Email address
          </label>
          <input
            type="email"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Enter email"
            ref={emailInputRef}
            id="inputEmail"
          />
        </div>
        <div className="mb-6 form-group">
          <label
            htmlFor="inputPassword"
            className="inline-block mb-2 text-gray-700 form-label"
          >
            Password
          </label>
          <input
            type="password"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="inputPassword"
            placeholder="Password"
            ref={passwordInputRef}
          />
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="float-left w-4 h-4 mt-1 mr-2 align-top transition duration-200 bg-white bg-center bg-no-repeat bg-contain border border-gray-300 rounded-sm appearance-none cursor-pointer form-check-input checked:bg-blue-600 checked:border-blue-600 focus:outline-none"
              id="exampleCheck2"
            />
            <label
              className="inline-block text-gray-800 form-check-label"
              htmlFor="exampleCheck2"
            >
              Remember me
            </label>
          </div>
          <a
            href="#!"
            className="text-blue-600 transition duration-200 ease-in-out hover:text-blue-700 focus:text-blue-700"
          >
            Reset password
          </a>
        </div>
        <button
          type="submit"
          className=" w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Auth;
