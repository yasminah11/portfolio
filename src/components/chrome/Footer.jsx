import { profile } from "@/data/profile";
import { Marquee } from "@/components/primitives/Marquee";

export function Footer() {
  return (
    <footer className="border-t border-hairline pb-28 pt-16">
      <Marquee items={["React.js", "JavaScript", "HTML5", "CSS3", "Bootstrap", "Tailwind CSS", "Git", "REST APIs"]} className="mb-16" />
      <div className="mx-auto grid max-w-6xl gap-6 px-5 sm:px-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end lg:px-14">
        <div className="min-w-0">
          <p className="display text-3xl accent-text">{profile.initials}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {profile.name} — built with React and Vite, shipped with care.
          </p>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          © {new Date().getFullYear()} · {profile.location} · Press ⌘K
        </p>
      </div>
    </footer>
  );
}
