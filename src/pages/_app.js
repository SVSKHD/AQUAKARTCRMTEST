import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import rootReducer from "@/Store";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Toaster position="bottom-center" reverseOrder={false} />
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}
