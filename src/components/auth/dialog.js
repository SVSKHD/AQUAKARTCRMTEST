import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userOperations from "@/services/user";
import AquaDialog from "../reusables/dialog";
import AquaInput from "../reusables/input";
import { Button, Badge } from "react-bootstrap";

const AuthDialog = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [errorStatus, setErrorStatus] = useState({
    loading: false,
    error: false,
    errorMessage: "",
  });
  const { userLogin } = userOperations();
  const dispatch = useDispatch();
  const { authDialog, userSignupStatus } = useSelector((state) => state);

  const handleDialogClose = () => {
    dispatch({ type: "SET_AUTH_DIALOG_VISIBLE", payload: false });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setErrorStatus({ error: false, errorMessage: "" });
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignupData = (event) => {
    event.preventDefault();
    setErrorStatus({ ...errorStatus, loading: true });
    if (!userData.email && !userData.password) {
      setErrorStatus({
        error: true,
        errorMessage: "Please provide email and password",
      });
    } else if (!userData.email) {
      setErrorStatus({ error: true, errorMessage: "Please provide email" });
    } else if (!userData.password) {
      setErrorStatus({ error: true, errorMessage: "Please provide password" });
    } else {
      userLogin(userData)
        .then((res) => {
          dispatch({ type: "LOGGED_IN_USER", payload: res.data });
          dispatch({ type: "SET_AUTH_DIALOG_VISIBLE", payload: false });
          setErrorStatus({ ...errorStatus, loading: false });
        })
        .catch((err) => {
          setErrorStatus({
            error: true,
            errorMessage: err.message,
            loading: false,
          });
        });
    }
  };

  return (
    <AquaDialog
      title={userSignupStatus ? "Signup" : "Signin"}
      show={authDialog}
      hide={handleDialogClose}
    >
      {errorStatus.error && (
        <h4>
          <Badge bg="danger">{errorStatus.errorMessage}</Badge>
        </h4>
      )}
      <div>
        <form onSubmit={handleSignupData}>
          <AquaInput
            label="email"
            value={userData.email}
            name="email"
            handleChange={handleChange}
            placeholder="Enter email"
          />
          <AquaInput
            label="password"
            value={userData.password}
            name="password"
            handleChange={handleChange}
            placeholder="Enter password"
          />
          <Button variant="dark" type="submit">
            {errorStatus.loading ? (
              <>
                <div class="spinner-border" role="status" />
              </>
            ) : (
              <> {userSignupStatus ? "Signup" : "Signin"}</>
            )}
          </Button>
        </form>
      </div>
    </AquaDialog>
  );
};

export default AuthDialog;
