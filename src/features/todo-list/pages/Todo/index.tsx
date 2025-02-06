import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../../api";
import { Loading } from "../../../../shared/components/Loading";
import { Todos } from "../../constants";
import { CheckCircle, Circle, Trash2 } from "lucide-react"; // Icons for visual feedback

export default function Todo() {
  const {
    isPending,
    error,
    data: todos,
  } = useQuery({
    queryKey: ["fetchtodos"],
    queryFn: () => getTodos(),
    staleTime: Infinity,
  });

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="error-message">
        An error has occurred: {error.message}
      </div>
    );
  }

  return (
    <div className="todo-container">
      <h1 className="todo-header">My Todo List</h1>
      <ul className="todo-list">
        {todos.map((todo: Todos) => (
          <li key={todo.title} className="todo-item">
            <div className="todo-status">
              {todo.isComplete ? (
                <CheckCircle className="icon complete" />
              ) : (
                <Circle className="icon incomplete" />
              )}
            </div>
            <div className="todo-content">
              <h2 className="todo-title">{todo.title}</h2>
              <p className="todo-description">{todo.description}</p>
            </div>
            <button className="todo-delete" aria-label="Delete todo">
              <Trash2 className="icon delete" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
