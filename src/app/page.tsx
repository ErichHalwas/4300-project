import Image from "next/image";
import connectMongoDB from "../../config/mongodb";
import Splash from "../components/Splash";
import Background from "@/components/Background";

export default function Home() {
  connectMongoDB();
  return (
    <Background>
      <Splash />
    </Background>
  )
}
