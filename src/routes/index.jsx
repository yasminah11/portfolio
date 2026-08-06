import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Marquee } from "@/components/primitives/Marquee";

const Skills = lazy(() =>
  import("@/components/sections/Skills").then((m) => ({ default: m.Skills })),
);
const Work = lazy(() => import("@/components/sections/Work").then((m) => ({ default: m.Work })));
const Activity = lazy(() =>
  import("@/components/sections/Activity").then((m) => ({ default: m.Activity })),
);
const Contact = lazy(() =>
  import("@/components/sections/Contact").then((m) => ({ default: m.Contact })),
);

export const Route = createFileRoute("/")({
  component: Index,
});

const Fallback = () => <div className="min-h-[40vh]" aria-hidden="true" />;

function Index() {
  return (
    <>
      <Hero />
      <Marquee
        items={[
          "React.js",
          "JavaScript ES6+",
          "HTML5",
          "CSS3",
          "Bootstrap",
          "Tailwind CSS",
          "REST APIs",
          "Git",
        ]}
        className="border-y border-hairline py-6"
      />
      <About />
      <Suspense fallback={<Fallback />}>
        <Skills />
        <Work />
        <Activity />
        <Contact />
      </Suspense>
    </>
  );
}
