import { toast } from "react-hot-toast";
import { FaCheckCircle, FaExclamation, FaCircleXmark } from "react-icons/fa";

const AquaToast = (message, type) => {
  let icon;
  let backgroundColor;
  let border;

  switch (type) {
    case "success":
      icon = <FaCheckCircle style={{ color: "#10A881" }} size={20} />;
      backgroundColor = "#FFFFFF";
      border = "#10A881";
      break;
    case "error":
      icon = <FaCircleXmark style={{ color: "#FF0000" }} size={20} />;
      backgroundColor = "#FFFFFF";
      border = "#EA7773";
      break;
    case "info":
      icon = <FaExclamation style={{ color: "#2B2B52" }} size={20} />;
      backgroundColor = "#FFFFFF";
      border = "#2B2B52";
      break;
    default:
      icon = null;
      backgroundColor = "#FFFFFF";
      border = "initial";  // Set a default border color or leave it as initial
  }

  toast(
    <div style={{ color: border, backgroundColor }}>
      {icon}   {message}
    </div>,
    {
      duration: 6000,
      style: {
        border:`3px solid ${border}`,
        margin:'12px',
        width: "300px",
        fontSize: "0.9rem",
      },
    }
  );
};

export default AquaToast;
