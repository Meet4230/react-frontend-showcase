import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodoById } from "../api";

export const useDeleteTodo = (addToast: Function) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodoById,
    onError: (error) => {
      console.error("Error deleting todo:", error);
      addToast({
        message: "Failed to delete todo. Please try again.",
        type: "error",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchtodos"] });
      addToast({ message: "Todo deleted successfully!", type: "success" });
    },
  });
};
