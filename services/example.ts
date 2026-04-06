import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

// Query key factory pattern — copy this for each new service
const exampleKeys = {
  all: ["examples"] as const,
  lists: () => [...exampleKeys.all, "list"] as const,
  detail: (id: string) => [...exampleKeys.all, "detail", id] as const,
};

// Define your types here (or import from types/database.ts after generating)
interface Example {
  id: string;
  created_at: string;
  title: string;
}

interface CreateExampleInput {
  title: string;
}

// Fetch list
export function useExampleList() {
  return useQuery({
    queryKey: exampleKeys.lists(),
    queryFn: async () => {
      // Replace "examples" with your actual table name after creating it
      const { data, error } = await supabase
        .from("examples" as never)
        .select("*");
      if (error) throw error;
      return data as unknown as Example[];
    },
  });
}

// Fetch single item
export function useExampleDetail(id: string) {
  return useQuery({
    queryKey: exampleKeys.detail(id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("examples" as never)
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as unknown as Example;
    },
    enabled: !!id,
  });
}

// Create mutation
export function useCreateExample() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateExampleInput) => {
      const { data, error } = await supabase
        .from("examples" as never)
        .insert(input as never)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Example;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: exampleKeys.lists() });
    },
  });
}
