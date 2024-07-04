import axios from "axios";

const BASE = process.env.NEXT_PUBLIC_API_URL
const userLogin = (data) => axios.post(`${BASE}/crm/user/login`, data);

const userOperations = () => {
  return {
    userLogin,
  };
};

export default userOperations;
