import { z } from "zod";

export const projectSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  tasks: z.number().int().nonnegative(),
  progress: z.number().int().min(0).max(100),
  color: z.string().min(1),
});

export const projectsSchema = z.array(projectSchema);

export type Project = z.infer<typeof projectSchema>;
