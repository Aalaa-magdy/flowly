import { projectsSchema, type Project } from "../../lib/schemas";

const projects: Project[] = [
  { id: "ui-design", name: "UI Design", tasks: 8, progress: 75, color: "var(--primary)" },
  {
    id: "development",
    name: "Development",
    tasks: 12,
    progress: 60,
    color: "var(--accent-blue)",
  },
  {
    id: "marketing",
    name: "Marketing",
    tasks: 5,
    progress: 40,
    color: "var(--accent-pink)",
  },
  {
    id: "research",
    name: "Research",
    tasks: 4,
    progress: 90,
    color: "var(--accent-yellow)",
  },
];

export function GET() {
  return Response.json(projectsSchema.parse(projects));
}
