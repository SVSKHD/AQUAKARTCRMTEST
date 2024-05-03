import AquaInput from "@/components/reusables/input";
import AquaToast from "@/components/reusables/toast";
import userOperations from "@/services/user";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const AquaCrmLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userLogin } = userOperations();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({
    loading: false,
    error: false,
    success: false,
    message: "",
  });
  const handleSignin = () => {
    setStatus({ ...status, loading: true });
    console.log("status", status, userData);
    userLogin(userData)
      .then((res) => {
        AquaToast("Welcome Admin", "success");
        setStatus({ ...status, loading: false });
        router.push("/home");
        console.log(res.data);
        dispatch({
            type:"LOGGED_IN_USER",
            payload:res.data
        })
      })
      .catch((err) => {
        AquaToast("sorry try again", "error");
      });
  };
  return (
    <div className="container center-align">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="crm-login">
                <AquaInput
                  label="Email"
                  type="email"
                  name="email"
                  value={userData.email}
                  handleChange={handleChange}
                />
                <AquaInput
                  label="password"
                  type="password"
                  name="password"
                  value={userData.password}
                  handleChange={handleChange}
                />
                <div class="d-grid gap-2">
                  <button
                    class="btn btn-primary"
                    type="button"
                    onClick={handleSignin}
                  >
                    {status.loading ? (
                      <div class="spinner-border" role="status" />
                    ) : (
                      "Signin"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AquaCrmLogin;
