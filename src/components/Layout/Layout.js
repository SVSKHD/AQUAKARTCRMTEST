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
      console.log("user", user);
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
      <div className="container mb-1 mt-1">
        <AquaCardLayover>
          {user ? (
            <div className="body-adjust">{props.children}</div>
          ) : (
            <div className="text-center">
              <button
                onClick={() =>
                  dispatch({
                    type: "SET_AUTH_DIALOG_VISIBLE",
                    payload: true,
                  })
                }
                className="btn btn-outline-dark"
              >
                Login to access
              </button>
            </div>
          )}
        </AquaCardLayover>
      </div>
    </>
  );
};
export default AquaLayout;
