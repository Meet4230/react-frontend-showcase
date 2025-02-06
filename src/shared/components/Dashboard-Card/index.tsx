import { Link } from "react-router-dom";
import type { DashboardCardProps } from "../../Interfaces";

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  image,
  link,
}) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 dark:bg-gray-800 dark:text-white">
    <img
      src={image || "/placeholder.svg"}
      alt={title}
      className="w-full h-[400px]"
    />
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">
        {title}
      </h2>
      <p className="text-gray-600 mb-4 dark:text-gray-400">{description}</p>
      <Link
        to={link}
        className="inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300 dark:bg-blue-700 dark:hover:bg-blue-600"
      >
        Explore {title}
      </Link>
    </div>
  </div>
);

export default DashboardCard;
