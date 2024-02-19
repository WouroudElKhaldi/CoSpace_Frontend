import HeroComp from "@/components/hero/hero";
import { getTopRatedSpaces } from "@/fetchData/spaces";

export default async function Home() {
  const data = await getTopRatedSpaces();
  return (
    <main>
      <HeroComp data={data} />
    </main>
  );
}
