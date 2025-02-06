import { DashboardCardProps } from "../../Interfaces";

export const projects: DashboardCardProps[] = [
  {
    title: "Todo List",
    description:
      "A sleek and efficient task management app built with React. Features include drag-and-drop reordering, priority levels, and due dates. Utilizes local storage for data persistence and context API for state management.",
    image: "/src/assets/todo.avif",
    link: "/todo-list",
  },
  {
    title: "E-commerce",
    description:
      "A full-featured online store with a modern UI. Includes product listings, cart functionality, user authentication, and checkout process. Built with React and Redux, it demonstrates handling complex state and API integrations.",
    image: "/src/assets/e-commorce.avif",
    link: "/e-commerce",
  },
  {
    title: "Social Media",
    description:
      "A responsive social networking platform showcasing real-time updates, user profiles, and interactive posts. Implements WebSocket for instant messaging and notifications. Demonstrates advanced React patterns and performance optimizations.",
    image: "/src/assets/social-media.avif",
    link: "/social-media",
  },
];
