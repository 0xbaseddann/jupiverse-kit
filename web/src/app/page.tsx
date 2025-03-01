import Playground from "@/components/shared/playground";

import Hero from "@/components/shared/hero";

export default function Home() {
  return (
    <main className="flex flex-col pb-16">
      <Hero />
      <Playground />
    </main>
  );
}
