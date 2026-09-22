import { useEffect, useState } from "react";
import { tutorialService, type Tutorial } from "../../services/tutorialService";

const ManageVideos = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    title: "", description: "", category: "", difficulty: "Beginner" as Tutorial["difficulty"],
    duration: "", instructor: "", thumbnail: "", videoUrl: "", videoTitle: "", videoDescription: "",
  });

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
      await tutorialService.createLesson(tutorial._id, {
        title: form.videoTitle || form.title, description: form.videoDescription || form.description,
        videoUrl: form.videoUrl, duration: form.duration, order: 1,
      });
      setShowForm(false);
      setMessage("Video tutorial published successfully.");
      await loadTutorials();
    } catch (error: any) {
      setMessage(error.message || "Failed to publish video");
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">Manage Videos</h1><p className="mt-1 text-sm text-gray-500">Publish tutorials with a playable video lesson.</p></div>
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
          <input required placeholder="Video URL" type="url" value={form.videoUrl} onChange={(event) => setForm({ ...form, videoUrl: event.target.value })} className="rounded-lg border p-3 md:col-span-2" />
          <input placeholder="Lesson title" value={form.videoTitle} onChange={(event) => setForm({ ...form, videoTitle: event.target.value })} className="rounded-lg border p-3" />
          <input placeholder="Lesson description" value={form.videoDescription} onChange={(event) => setForm({ ...form, videoDescription: event.target.value })} className="rounded-lg border p-3" />
          <button type="submit" className="rounded-lg bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700 md:col-span-2">Publish Video</button>
        </form>
      )}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full"><thead className="border-b border-gray-200 bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Title</th><th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Category</th><th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Difficulty</th><th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Status</th></tr></thead>
          <tbody className="divide-y divide-gray-200">{tutorials.map((tutorial) => <tr key={tutorial._id}><td className="px-6 py-4 text-sm font-medium text-gray-900">{tutorial.title}</td><td className="px-6 py-4 text-sm text-gray-500">{tutorial.category}</td><td className="px-6 py-4 text-sm text-gray-500">{tutorial.difficulty}</td><td className="px-6 py-4 text-sm text-green-600">{tutorial.published ? "Published" : "Draft"}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageVideos;