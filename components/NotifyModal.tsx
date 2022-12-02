import { FC, useContext, useEffect } from "react";
import MiscContext from "../context/misc-context";

interface NotifyModalProps {
  variant: "success" | "warning";
  text: string;
}

const NotifyModal: FC<NotifyModalProps> = ({ variant, text }) => {
  const miscCtx = useContext(MiscContext);

  const bgColor = () => {
    if (variant === "success") return "bg-green-500";
    if (variant === "warning") return "bg-red-500";
  };

  useEffect(() => {
    setTimeout(() => miscCtx.setShowNotifyModal({ show: false }), 3000);
  }, []);

  return (
    <div className={`fixed z-10 w-full h-16 text-white ${bgColor()}`}>
      <div className="flex flex-col items-center justify-center h-full text-sm">
        <p>{text}</p>
        <button
          onClick={() => miscCtx.setShowNotifyModal({ show: false })}
          className="w-20 p-1 mt-1 text-white bg-gray-600 rounded-md hover:bg-gray-700"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default NotifyModal;
