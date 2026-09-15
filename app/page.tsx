import Hero from "./components/Hero";
import Register from "./components/Register";
import About from "./components/About";
import PastProjects from "./components/PastProjects";
import Tracks from "./components/Tracks";
import Schedule from "./components/Schedule";
import Sponsors from "./components/Sponsors";
import Team from "./components/Team";
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="relative flex flex-col overflow-x-clip">
      <Hero />
      <Register />
      <About />
      <PastProjects />
      <Tracks />
      <Schedule/>
      <Sponsors/>
      <Team />
    </main>
  );
}