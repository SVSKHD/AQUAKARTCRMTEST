import axios from "axios";

const userLogin = (data) => axios.post("/admin/crm/api/user/login", data);

const userOperations = () => {
  return {
    userLogin,
  };
};

export default userOperations;
