import { useSelector, useDispatch } from "react-redux";
import AquaCardLayover from "../cards/CardLayoutLayover";
import AquaNav from "./Header";
import { useEffect, useState } from "react";
import AuthDialog from "../auth/dialog";

const AquaLayout = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (!user) {
     console.log("user", user)
      dispatch({
        type: "SET_AUTH_DIALOG_VISIBLE",
        payload: true,
      });
    }
  }, [user, dispatch]);
  return (
    <>
      <div className="nav-adjust container">
        <AquaNav />
        <AuthDialog />
      </div>
      <div className="container-fluid mb-1 mt-1">
        <AquaCardLayover>
          <div className="body-adjust">{props.children}</div>
        </AquaCardLayover>
      </div>
    </>
  );
};
export default AquaLayout;
