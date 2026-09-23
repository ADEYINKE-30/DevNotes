import { Link } from "react-router-dom";
import type { BlogPost } from "../../types/blog";

interface RecommendedTutorialsProps {
  tutorials: BlogPost[];
}

const RecommendedTutorials = ({ tutorials }: RecommendedTutorialsProps) => {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      React: "bg-green-100 text-green-700",
      TypeScript: "bg-indigo-100 text-indigo-700",
      "Tailwind CSS": "bg-cyan-100 text-cyan-700",
      CSS: "bg-purple-100 text-purple-700",
      JavaScript: "bg-yellow-100 text-yellow-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">Recommended for You</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tutorials.map((tutorial) => (
          <Link
            key={tutorial.id}
            to={`/blog/${tutorial.slug}`}
            className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getCategoryColor(tutorial.category)}`}
            >
              Recommended
            </span>
            <h3 className="mt-3 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
              {tutorial.title}
            </h3>
            <p className="mt-2 text-sm text-gray-500">{tutorial.description}</p>

            <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
              <span>⏱️ {tutorial.readTime}</span>
              {tutorial.author && <span>By {tutorial.author}</span>}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecommendedTutorials;