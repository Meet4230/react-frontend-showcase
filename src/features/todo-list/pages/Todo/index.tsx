import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../../api";
import { Loading } from "../../../../shared/components/Loading";
import type { Todos } from "../../constants";
import { CheckCircle, Circle, Trash2, PlusCircle, Edit2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Card, CardContent } from "../../components/ui/card";
import { useToast } from "../../components/ui/toast";
import { useCreateTodo } from "../../hooks/useCreateTodo";
import { useDeleteTodo } from "../../hooks/useDeleteTodo";
import { useUpdateTodo } from "../../hooks/useUpdateTodo";
import Header from "../../../ecommerce/components/ui/Header";

export default function Todo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState<string>("");
  const [updatedDescription, setUpdatedDescription] = useState<string>("");
  const { Toast, addToast } = useToast();

  const {
    isPending,
    error,
    data: todos,
  } = useQuery({
    queryKey: ["fetchtodos"],
    queryFn: () => getTodos(),
    staleTime: Number.POSITIVE_INFINITY,
  });

  const { mutateAsync: createTodoMutation } = useCreateTodo(addToast);
  const { mutateAsync: deleteTodoMutation } = useDeleteTodo(addToast);
  const { mutateAsync: updateTodoMutation } = useUpdateTodo(
    addToast,
    setEditingTodoId
  );

  const handleAddTodo = async () => {
    if (!title.trim()) {
      addToast({ message: "Title is required.", type: "error" });
      return;
    }
    const newTodo: Todos = {
      _id: crypto.randomUUID(),
      title: title,
      description: description,
    };
    await createTodoMutation(newTodo);
    setTitle("");
    setDescription("");
  };
  const handleUpdate = async (todoId: string, updatedData: Todos) => {
    await updateTodoMutation({ id: todoId, data: updatedData });
  };

  const startEditing = (todo: Todos) => {
    setEditingTodoId(todo._id);
    setUpdatedTitle(todo.title);
    setUpdatedDescription(todo.description);
  };

  const cancelEditing = () => {
    setEditingTodoId(null);
    setUpdatedTitle("");
    setUpdatedDescription("");
  };

  const submitUpdate = (todoId: string) => {
    if (!updatedTitle.trim()) {
      addToast({ message: "Title is required.", type: "error" });
      return;
    }
    const updatedData: Todos = {
      _id: todoId,
      title: updatedTitle,
      description: updatedDescription,
    };
    handleUpdate(todoId, updatedData);
  };

  const handleDelete = async (todoId: string) => {
    await deleteTodoMutation(todoId);
  };

  if (isPending) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message text-red-500 text-center">
        An error has occurred: {error.message}
      </div>
    );
  }

  return (
    <div className="container h-screen mx-auto px-4 py-8 max-w-4xl">
      {/* <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white mt-[33px]">
        My Todo List
      </h1> */}
      <Header headTitle="TODO LIST" showSearch={false} showCart={false} />

      <Card className="mb-8">
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddTodo();
            }}
            className="space-y-4"
          >
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              className="w-full"
            />
            <Textarea
              placeholder="Description"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
              className="w-full"
            />
            <Button type="submit" className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Todo
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {todos.map((todo: Todos) => (
          <Card key={todo._id}>
            <CardContent>
              {editingTodoId === todo._id ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitUpdate(todo._id);
                  }}
                  className="space-y-4"
                >
                  <Input
                    type="text"
                    value={updatedTitle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUpdatedTitle(e.target.value)
                    }
                    placeholder="Title"
                    className="w-full"
                  />
                  <Textarea
                    value={updatedDescription}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setUpdatedDescription(e.target.value)
                    }
                    placeholder="Description"
                    className="w-full"
                  />
                  <div className="flex justify-end space-x-2">
                    <Button type="submit" variant="outline">
                      Save
                    </Button>
                    <Button onClick={cancelEditing} variant="ghost">
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    {todo.isComplete ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                      <Circle className="h-6 w-6 text-gray-300" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <h2
                      className={`text-lg font-semibold ${
                        todo.isComplete
                          ? "line-through text-gray-500"
                          : "text-gray-800 dark:text-white"
                      }`}
                    >
                      {todo.title}
                    </h2>
                    <p
                      className={`text-sm ${
                        todo.isComplete
                          ? "line-through text-gray-400"
                          : "text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {todo.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 ml-4 space-x-2">
                    <Button
                      onClick={() => startEditing(todo)}
                      variant="ghost"
                      size="icon"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(todo._id)}
                      variant="ghost"
                      size="icon"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <Toast message="" />
    </div>
  );
}
