import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "../api";

export const useCreateTodo = (addToast: Function) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onError: (error) => {
      console.error("Error creating todo:", error);
      addToast({
        message: "Failed to create todo. Please try again.",
        type: "error",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchtodos"] });
      addToast({ message: "Todo created successfully!" });
    },
  });
};
