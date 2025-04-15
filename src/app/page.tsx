import Image from "next/image";
import connectMongoDB from "../../config/mongodb";
import Splash from "../components/Splash";

export default function Home() {
  connectMongoDB();
  return (
      <Splash />
  )
}
