import { useRef, useContext, useState } from "react";
import { useRouter } from "next/router";

import AuthContext from "../../context/auth-context";
import Link from "next/link";

type Data = {
  idToken: string;
  expiresIn: string;
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
        const { idToken, expiresIn } = data;
        const expirationTime = new Date(
          new Date().getTime() + +expiresIn * 1000
        );
        authCtx.login(idToken, expirationTime.toString());
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-sm p-4 mx-auto bg-white rounded-md shadow-lg md:p-6 md:mt-4">
      <form onSubmit={submitHandler}>
        <div className="mb-4 md:mb-6 form-group">
          <label
            htmlFor="inputEmail"
            className="inline-block mb-2 text-gray-700 form-label"
          >
            Email address
          </label>
          <input
            type="email"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Enter email"
            ref={emailInputRef}
            id="inputEmail"
          />
        </div>
        <div className="mb-6 md:mb-8 form-group">
          <label
            htmlFor="inputPassword"
            className="inline-block mb-2 text-gray-700 form-label"
          >
            Password
          </label>
          <input
            type="password"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="inputPassword"
            placeholder="Password"
            ref={passwordInputRef}
          />
        </div>
        <div className="flex justify-around">
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-md shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Sign in
          </button>
          <Link href="..">
            <button className="px-6 py-2.5 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-md shadow-md hover:bg-gray-100 hover:shadow-lg focus:bg-gray-100 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-200 active:shadow-lg transition duration-150 ease-in-out">
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Auth;
