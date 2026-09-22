import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

async function fetchPrs() {
  const res = await fetch("/api/prs");
  return res.json();
}

async function createPr(newPr) {
  const res = await fetch("/api/prs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPr),
  });
  return res.json();
}

export function usePrs() {
  return useQuery({
    queryKey: ["prs"],
    queryFn: fetchPrs,
  });
}

export function useCreatePr() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPr,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prs"] });
    },
  });
}

async function updatePr({ id, ...updates }) {
  const res = await fetch(`/api/prs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return res.json();
}

export function useUpdatePr() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePr,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prs"] });
    },
  });
}