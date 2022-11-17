import { FC, PropsWithChildren, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../../context/auth-context";

type ProtectRouteProps = {
  children: JSX.Element;
};

const ProtectRoute: FC<PropsWithChildren<ProtectRouteProps>> = ({
  children,
}) => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  if (!authCtx.isLoggedIn && router.pathname === "/add") {
    router.push("/");
  }
  return children;
};

export default ProtectRoute;
