import axios from "axios";

const BASE = process.env.NEXT_PUBLIC_API_URL
const userLogin = (data) => axios.post(`https://api.aquakart.co.in/v1/crm/user/login`, data);

const userOperations = () => {
  return {
    userLogin,
  };
};

export default userOperations;
