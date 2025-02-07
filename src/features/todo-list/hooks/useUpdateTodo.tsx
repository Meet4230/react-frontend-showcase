import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodoById } from "../api";

export const useUpdateTodo = (
  addToast: Function,
  setEditingTodoId: Function
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodoById,
    onError: (error) => {
      console.error("Error updating todo", error);
      addToast({
        message: "Failed to update todo. Please try again.",
        type: "error",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchtodos"] });
      setEditingTodoId(null);
      addToast({ message: "Todo updated successfully!" });
    },
  });
};
