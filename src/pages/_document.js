import { Html, Head, Main, NextScript } from "next/document";
import { Toaster } from "react-hot-toast";
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="icon"
          href="https://res.cloudinary.com/aquakartproducts/image/upload/v1695408028/favicon_b3l7y1.ico" // Replace with the path to your favicon image
        />
      </Head>
      <body>
        <Toaster />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
