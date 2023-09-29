import { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css'


export default function App({ Component, pageProps }) {

  return (
    <>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
      <Component {...pageProps} />
    </>
  )
}


