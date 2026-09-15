import { Link } from "react-router-dom";
import type { LessonProgress } from "../../data/mockProgress";

interface CompletedLessonsProps {
  lessons: LessonProgress[];
}

const CompletedLessons = ({ lessons }: CompletedLessonsProps) => {
  const completed = lessons.filter((l) => l.completed);

  if (completed.length === 0) {
    return (
      <section>
        <h2 className="mb-6 text-2xl font-bold">Completed Lessons</h2>
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
          <p className="text-lg text-gray-500">No lessons completed yet.</p>
          <p className="mt-2 text-sm text-gray-400">
            Keep learning and track your progress here!
          </p>
          <Link
            to="/blog"
            className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Browse Lessons
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Completed Lessons</h2>
        <span className="text-sm text-gray-500">
          {completed.length} of {lessons.length} complete
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-3 font-semibold text-gray-600">Lesson</th>
              <th className="px-6 py-3 font-semibold text-gray-600">Category</th>
              <th className="px-6 py-3 font-semibold text-gray-600">Duration</th>
              <th className="px-6 py-3 font-semibold text-gray-600">Completed</th>
              <th className="px-6 py-3 font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {lessons.map((lesson) => (
              <tr
                key={lesson.postId}
                className={`transition hover:bg-gray-50 ${
                  lesson.completed ? "" : "opacity-60"
                }`}
              >
                <td className="px-6 py-4">
                  <Link
                    to={`/blog/${lesson.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className="font-medium text-gray-900 hover:text-blue-600"
                  >
                    {lesson.title}
                  </Link>
                </td>
                <td className="px-6 py-4 text-gray-500">{lesson.category}</td>
                <td className="px-6 py-4 text-gray-500">{lesson.readTime}</td>
                <td className="px-6 py-4 text-gray-500">
                  {new Date(lesson.lastAccessed).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  {lesson.completed ? (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      ✅ Done
                    </span>
                  ) : (
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                      {lesson.progress}%
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CompletedLessons;