import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

//  FETCH PR
async function fetchPrs() {
  const res = await fetch("/api/prs");
  return res.json();
}

export function usePrs() {
  return useQuery({
    queryKey: ["prs"],
    queryFn: fetchPrs,
  });
}

// CREATE PR
async function createPr(newPr) {
  const res = await fetch("/api/prs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPr),
  });
  return res.json();
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

// UPDATE PR
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

// DELETE PR
async function deletePr(id) {
  const res = await fetch(`/api/prs/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

export function useDeletePr() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePr,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prs"] });
    },
  });
}