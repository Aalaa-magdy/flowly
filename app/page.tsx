import { ThemeToggle } from "./theme-toggle";

const projects = [
  { name: "UI Design", tasks: 8, progress: 75, color: "var(--primary)" },
  {
    name: "Development",
    tasks: 12,
    progress: 60,
    color: "var(--accent-blue)",
  },
  { name: "Marketing", tasks: 5, progress: 40, color: "var(--accent-pink)" },
  {
    name: "Research",
    tasks: 4,
    progress: 90,
    color: "var(--accent-yellow)",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background font-sans text-foreground">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-muted uppercase">
            Flowly
          </p>
          <p className="text-lg font-semibold">Midnight</p>
        </div>
        <ThemeToggle />
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-secondary">Project management workspace</p>
            <h1 className="mt-1 text-2xl font-semibold">My Projects</h1>
          </div>
          <button
            type="button"
            className="text-sm font-medium text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            View all →
          </button>
        </div>

        <section className="grid gap-4 sm:grid-cols-2" aria-label="Projects">
          {projects.map((project) => (
            <article
              key={project.name}
              className="rounded-2xl border border-border bg-surface p-5 transition-colors hover:bg-surface-hover"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: project.color }}
                  />
                  <h2 className="font-medium">{project.name}</h2>
                </div>
                <span className="text-sm text-secondary">{project.tasks} tasks</span>
              </div>
              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-surface-secondary">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${project.progress}%`,
                    backgroundColor: project.color,
                  }}
                />
              </div>
              <p className="mt-3 text-sm font-medium text-secondary">
                {project.progress}%
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-border bg-surface p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Weekly progress</h2>
            <span className="text-sm font-medium text-primary">75%</span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-secondary">
            <div className="h-full w-3/4 rounded-full bg-primary" />
          </div>
          <p className="mt-3 text-sm text-secondary">75% of your weekly goal</p>
        </section>
      </main>
    </div>
  );
}
