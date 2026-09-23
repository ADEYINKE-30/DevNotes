import { useEffect, useState } from "react";
import { blogService, type BlogPost } from "../../services/blogService";

const ManageArticles = () => {
  const [articleList, setArticleList] = useState<BlogPost[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    image: "",
    author: "",
    readTime: "",
    published: true,
  });

  const loadArticles = async () => {
    const response = await blogService.getPosts({ page: 1, limit: 100 });
    setArticleList(response.posts);
  };

  useEffect(() => {
    loadArticles().catch((error) => setMessage(error.message));
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("");
    try {
      if (editingId) {
        await blogService.updatePost(editingId, form);
      } else {
        await blogService.createPost(form);
      }
      setForm({ title: "", description: "", content: "", category: "", image: "", author: "", readTime: "", published: true });
      setShowForm(false);
      setEditingId(null);
      await loadArticles();
      setMessage(editingId ? "Article updated successfully." : "Article published successfully.");
    } catch (error: any) {
      setMessage(error.message || "Failed to publish article");
    }
  };

  const handleEdit = (article: BlogPost) => {
    setEditingId(article._id);
    setForm({
      title: article.title,
      description: article.description,
      content: article.content,
      category: article.category,
      image: article.image || article.thumbnail || "",
      author: article.author,
      readTime: article.readTime,
      published: article.published,
    });
    setShowForm(true);
    setMessage("");
  };

  const handleDelete = async (article: BlogPost) => {
    if (!window.confirm(`Delete "${article.title}"? This action cannot be undone.`)) return;

    setDeletingId(article._id);
    setMessage("");
    try {
      await blogService.deletePost(article._id);
      setMessage("Article deleted successfully.");
      await loadArticles();
    } catch (error: any) {
      setMessage(error.message || "Failed to delete article");
    } finally {
      setDeletingId(null);
    }
  };

  const handleFormToggle = () => {
    setShowForm((current) => !current);
    setEditingId(null);
    setForm({ title: "", description: "", content: "", category: "", image: "", author: "", readTime: "", published: true });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Manage Articles</h1>
        <button onClick={handleFormToggle} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
          {showForm ? "Close" : "+ New Article"}
        </button>
      </div>
      {message && <p className="mb-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">{message}</p>}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 grid gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:grid-cols-2">
          <input required placeholder="Article title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="rounded-lg border p-3" />
          <input required placeholder="Category" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className="rounded-lg border p-3" />
          <input required placeholder="Short description" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className="rounded-lg border p-3" />
          <input placeholder="Author" value={form.author} onChange={(event) => setForm({ ...form, author: event.target.value })} className="rounded-lg border p-3" />
          <input placeholder="Image URL" type="url" value={form.image} onChange={(event) => setForm({ ...form, image: event.target.value })} className="rounded-lg border p-3" />
          <input placeholder="Read time (e.g. 8 min read)" value={form.readTime} onChange={(event) => setForm({ ...form, readTime: event.target.value })} className="rounded-lg border p-3" />
          <textarea required placeholder="Article content" value={form.content} onChange={(event) => setForm({ ...form, content: event.target.value })} className="min-h-40 rounded-lg border p-3 md:col-span-2" />
          <button type="submit" className="rounded-lg bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700 md:col-span-2">{editingId ? "Save Changes" : "Publish Article"}</button>
        </form>
      )}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {articleList.map((article) => (
              <tr key={article._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{article.title}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{article.category}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{article.author}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{new Date(article.publishedAt || article.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button type="button" onClick={() => handleEdit(article)} className="text-sm text-blue-600 hover:underline">Edit</button>
                    <button type="button" onClick={() => void handleDelete(article)} disabled={deletingId === article._id} className="text-sm text-red-600 hover:underline disabled:cursor-not-allowed disabled:opacity-50">{deletingId === article._id ? "Deleting..." : "Delete"}</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageArticles;