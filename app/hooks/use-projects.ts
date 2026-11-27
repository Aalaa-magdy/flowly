"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchJson, queryKeys } from "../lib/api";
import { projectsSchema } from "../lib/schemas";

export function useProjects() {
  return useQuery({
    queryKey: queryKeys.projects,
    queryFn: async () =>
      projectsSchema.parse(await fetchJson<unknown>("/api/projects")),
  });
}
