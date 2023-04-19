import { useState, CSSProperties } from "react";
import { ClimbingBoxLoader, PacmanLoader } from "react-spinners";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Spinner = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("");

  return (
    <div className="sweet-loading py-80 flex items-center justify-center bg-slate-400">
    {/* <ClimbingBoxLoader
  color="rgba(28, 49, 122, 1)"
  size={28}
/> */}
<PacmanLoader
  color="rgba(28, 49, 122, 1)"
  size={30}
/>


    </div>
  );
};

export default Spinner;
