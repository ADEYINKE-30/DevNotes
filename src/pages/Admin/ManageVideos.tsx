import { useEffect, useState } from "react";
import { tutorialService, type Tutorial } from "../../services/tutorialService";

interface LessonDraft {
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
}

const emptyLesson = (): LessonDraft => ({ title: "", description: "", videoUrl: "", duration: "" });

const ManageVideos = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "", description: "", category: "", difficulty: "Beginner" as Tutorial["difficulty"],
    duration: "", instructor: "", thumbnail: "",
  });
  const [lessons, setLessons] = useState<LessonDraft[]>([emptyLesson()]);

  const loadTutorials = async () => {
    const response = await tutorialService.getTutorials({ page: 1, limit: 100 });
    setTutorials(response.tutorials);
  };

  useEffect(() => { loadTutorials().catch((error) => setMessage(error.message)); }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("");
    try {
      const tutorial = await tutorialService.createTutorial({
        title: form.title, description: form.description, category: form.category,
        difficulty: form.difficulty, duration: form.duration, instructor: form.instructor,
        thumbnail: form.thumbnail, published: true, featured: false, tags: [],
      });
      for (const [index, lesson] of lessons.entries()) {
        await tutorialService.createLesson(tutorial._id, {
          title: lesson.title || `${form.title} - Lesson ${index + 1}`,
          description: lesson.description || form.description,
          videoUrl: lesson.videoUrl,
          duration: lesson.duration || form.duration,
          order: index + 1,
        });
      }
      setShowForm(false);
      setLessons([emptyLesson()]);
      setMessage("Video tutorial published successfully.");
      await loadTutorials();
    } catch (error: any) {
      setMessage(error.message || "Failed to publish video");
    }
  };

  const handleDelete = async (tutorial: Tutorial) => {
    if (!window.confirm(`Delete "${tutorial.title}" and all of its lessons? This action cannot be undone.`)) return;

    setDeletingId(tutorial._id);
    setMessage("");
    try {
      await tutorialService.deleteTutorial(tutorial._id);
      setMessage("Tutorial deleted successfully.");
      await loadTutorials();
    } catch (error: any) {
      setMessage(error.message || "Failed to delete tutorial");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">Manage Videos</h1><p className="mt-1 text-sm text-gray-500">Publish tutorials with multiple playable lessons.</p></div>
        <button onClick={() => setShowForm((current) => !current)} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">{showForm ? "Close" : "+ New Video"}</button>
      </div>
      {message && <p className="mb-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">{message}</p>}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 grid gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:grid-cols-2">
          <input required placeholder="Tutorial title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="rounded-lg border p-3" />
          <input required placeholder="Category" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className="rounded-lg border p-3" />
          <textarea required placeholder="Tutorial description" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className="min-h-28 rounded-lg border p-3 md:col-span-2" />
          <select value={form.difficulty} onChange={(event) => setForm({ ...form, difficulty: event.target.value as Tutorial["difficulty"] })} className="rounded-lg border p-3"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select>
          <input required placeholder="Duration (e.g. 20 min)" value={form.duration} onChange={(event) => setForm({ ...form, duration: event.target.value })} className="rounded-lg border p-3" />
          <input placeholder="Instructor" value={form.instructor} onChange={(event) => setForm({ ...form, instructor: event.target.value })} className="rounded-lg border p-3" />
          <input placeholder="Thumbnail URL" type="url" value={form.thumbnail} onChange={(event) => setForm({ ...form, thumbnail: event.target.value })} className="rounded-lg border p-3" />
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center justify-between">
              <div><h2 className="font-semibold text-gray-900">Course lessons</h2><p className="text-sm text-gray-500">Add each lesson that should appear in Course Content.</p></div>
              <button type="button" onClick={() => setLessons((current) => [...current, emptyLesson()])} className="rounded-lg border border-blue-200 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">Add lesson</button>
            </div>
            {lessons.map((lesson, index) => (
              <div key={index} className="grid gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 md:grid-cols-2">
                <div className="flex items-center justify-between md:col-span-2"><h3 className="font-medium text-gray-900">Lesson {index + 1}</h3>{lessons.length > 1 && <button type="button" onClick={() => setLessons((current) => current.filter((_, lessonIndex) => lessonIndex !== index))} className="text-sm text-red-600 hover:text-red-700">Remove</button>}</div>
                <input required={!lesson.title} placeholder="Lesson title" value={lesson.title} onChange={(event) => setLessons((current) => current.map((item, lessonIndex) => lessonIndex === index ? { ...item, title: event.target.value } : item))} className="rounded-lg border p-3" />
                <input placeholder="Lesson duration (e.g. 20 min)" value={lesson.duration} onChange={(event) => setLessons((current) => current.map((item, lessonIndex) => lessonIndex === index ? { ...item, duration: event.target.value } : item))} className="rounded-lg border p-3" />
                <textarea placeholder="Lesson description" value={lesson.description} onChange={(event) => setLessons((current) => current.map((item, lessonIndex) => lessonIndex === index ? { ...item, description: event.target.value } : item))} className="min-h-20 rounded-lg border p-3" />
                <input required type="url" placeholder="Video URL" value={lesson.videoUrl} onChange={(event) => setLessons((current) => current.map((item, lessonIndex) => lessonIndex === index ? { ...item, videoUrl: event.target.value } : item))} className="rounded-lg border p-3" />
              </div>
            ))}
          </div>
          <button type="submit" className="rounded-lg bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700 md:col-span-2">Publish Tutorial</button>
        </form>
      )}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full"><thead className="border-b border-gray-200 bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Title</th><th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Category</th><th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Difficulty</th><th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Status</th><th className="px-6 py-3 text-right text-xs uppercase text-gray-500">Actions</th></tr></thead>
          <tbody className="divide-y divide-gray-200">{tutorials.map((tutorial) => <tr key={tutorial._id}><td className="px-6 py-4 text-sm font-medium text-gray-900">{tutorial.title}</td><td className="px-6 py-4 text-sm text-gray-500">{tutorial.category}</td><td className="px-6 py-4 text-sm text-gray-500">{tutorial.difficulty}</td><td className="px-6 py-4 text-sm text-green-600">{tutorial.published ? "Published" : "Draft"}</td><td className="px-6 py-4 text-right"><button type="button" onClick={() => void handleDelete(tutorial)} disabled={deletingId === tutorial._id} className="text-sm font-semibold text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50">{deletingId === tutorial._id ? "Deleting..." : "Delete"}</button></td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageVideos;