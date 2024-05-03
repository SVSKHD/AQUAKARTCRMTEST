import { useRouter } from "next/router";
import { useEffect } from "react";
import HomeComponent from "@/PageComponents/Home";
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
