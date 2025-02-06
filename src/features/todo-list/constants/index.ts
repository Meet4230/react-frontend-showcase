export interface Todos {
  title: string;
  description: string;
  isComplete: boolean;
}

export interface TodoListProps {
  todos: Todos[];
}
