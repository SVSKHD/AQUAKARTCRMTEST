import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import rootReducer from "@/Store";
import { Provider } from "react-redux";
import { createStore } from "redux";

const Store = createStore(rootReducer);
export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={Store}>
        <Toaster position="bottom-center" reverseOrder={false} />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
