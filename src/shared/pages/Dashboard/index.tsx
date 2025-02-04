import type React from "react";
import { Link } from "react-router-dom";

interface ProjectCard {
  title: string;
  description: string;
  image: string;
  link: string;
}

const projects: ProjectCard[] = [
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

const ProjectCard: React.FC<ProjectCard> = ({
  title,
  description,
  image,
  link,
}) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105">
    <img
      src={image || "/placeholder.svg"}
      alt={title}
      className="w-full h-[400px]"
    />
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link
        to={link}
        className="inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
      >
        Explore {title}
      </Link>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid mt-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
