import { Toaster } from 'react-hot-toast';
import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';



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


