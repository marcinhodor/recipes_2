import { FC, PropsWithChildren, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../../context/auth-context";
import MiscContext from "../../context/misc-context";

type ProtectRouteProps = {
  children: JSX.Element;
};

const ProtectRoute: FC<PropsWithChildren<ProtectRouteProps>> = ({
  children,
}) => {
  const authCtx = useContext(AuthContext);
  const miscCtx = useContext(MiscContext);
  const router = useRouter();

  if (!authCtx.isLoggedIn && router.pathname === "/add") {
    router.push("/");
    miscCtx.setShowNoAccessModal(true);
  }
  return children;
};

export default ProtectRoute;
