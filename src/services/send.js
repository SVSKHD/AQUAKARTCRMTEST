import axios from "axios";

const BASE = process.env.NEXT_PUBLIC_API_NOTIFY;

const sendWhatsAppMessage = async (token, no, message) =>
  await axios.get(`${BASE}/send-whatsapp/${no}?message=${message}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Set the authorization header
    },
  });

const notifyServiceOperarations = {
  sendWhatsAppMessage,
};

export default notifyServiceOperarations;
