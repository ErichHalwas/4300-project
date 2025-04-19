import Image from "next/image";
import connectMongoDB from "../../config/mongodb";
import Splash from "../components/Splash";
import Background from "@/components/Background";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  connectMongoDB();
  return (
    <SessionProvider>
      <Background>
        <Splash />
      </Background>
    </SessionProvider>
  )
}
