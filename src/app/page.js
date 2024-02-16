import HeroComp from "@/components/hero/hero";
import Navbar from "@/components/navbar/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroComp />
    </main>
  );
}
