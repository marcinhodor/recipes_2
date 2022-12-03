import { useRef, useContext, useState } from "react";
import { useRouter } from "next/router";

import AuthContext from "../../context/auth-context";
import MiscContext from "../../context/misc-context";
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
  const miscCts = useContext(MiscContext);

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
        throw new Error(errorMsg!);
      } else {
        const { idToken, expiresIn } = data;
        const expirationTime = new Date(
          new Date().getTime() + +expiresIn * 1000
        );
        authCtx.login(idToken, expirationTime.toString());
        router.push("/");
        miscCts.setShowNotifyModal({
          show: true,
          variant: "success",
          text: "Log in successful. Hello again!",
        });
      }
    } catch (err) {
      miscCts.setShowNotifyModal({
        show: true,
        variant: "warning",
        text: "Could not log in! Check your credentials and try again.",
      });
    }
  };

  return (
    <div className="max-w-sm p-4 mx-auto bg-white rounded-md shadow md:p-6 md:mt-4">
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
            className="w-24 py-2 text-xs font-medium leading-tight text-blue-400 uppercase transition duration-150 ease-in-out border-2 border-blue-400 rounded-md hover:bg-black hover:bg-opacity-5"
          >
            Sign in
          </button>
          <Link href="..">
            <button className="w-24 py-2 text-xs font-medium leading-tight text-gray-400 uppercase transition duration-150 ease-in-out border-2 border-gray-400 rounded-md hover:bg-black hover:bg-opacity-5">
              Cancel
            </button>
          </Link>
        </div>
      </form>
      <div className="mt-4 md:mt-6">
        <h1>For testing purposes use the following credentials:</h1>
        <p>Email: test@test.com</p>
        <p>Password: test123</p>
      </div>
    </div>
  );
};

export default Auth;
