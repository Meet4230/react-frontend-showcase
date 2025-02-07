export interface Todos {
  _id: string;
  title: string;
  description: string;
  isComplete?: boolean;
}

export interface TodoListProps {
  todos: Todos[];
}
