import Image from "next/image";
import connectMongoDB from "../../config/mongodb";

export default function Home() {
  connectMongoDB();
  return;
}
