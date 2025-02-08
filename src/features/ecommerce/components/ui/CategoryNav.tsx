import { Category } from "../../interface";

export default function CategoryNav({
  categories,
  onSelectCategory,
}: {
  categories: Category[];
  onSelectCategory: (category: string) => void;
}) {
  return (
    <nav className="bg-gray-100 py-4">
      <div className="container mx-auto px-4">
        <ul className="flex space-x-4 overflow-x-auto">
          <li>
            <button
              onClick={() => onSelectCategory("all")}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-md"
            >
              All
            </button>
          </li>
          {categories.map((category) => (
            <li key={category._id}>
              <button
                onClick={() => onSelectCategory(category._id)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-md"
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
