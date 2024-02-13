import axios from "axios";

const userLogin = (data) => axios.post("/api/login", data);

const userOperations = () => {
  return {
    userLogin,
  };
};

export default userOperations;
