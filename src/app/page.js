import HeroComp from "@/components/hero/hero";
import HomePage from "@/components/homePage/HomePage";
import { getTopRatedSpaces } from "@/fetchData/spaces";

export default async function Home() {
  const data = await getTopRatedSpaces();
  return (
    <main>
      <HeroComp data={data} />
      <HomePage />
    </main>
  );
}
