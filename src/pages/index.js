import HomeComponent from "@/PageComponents/Home";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  useEffect(() => {}, []);
  return (
    <>
      <HomeComponent />
    </>
  );
};
export default Home;
