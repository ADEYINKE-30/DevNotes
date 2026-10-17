import { useEffect, useState, type FormEvent } from "react";
import { authService, type User } from "../../services/authService";
import LoadingSpinner from "../../components/common/LoadingSpinner";

type UserForm = { name: string; email: string; role: User["role"] };

const emptyForm: UserForm = { name: "", email: "", role: "user" };

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<UserForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  const loadUsers = async () => {
    setLoading(true);
    try {
      setUsers(await authService.getUsers());
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadUsers();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!editingId) return;

    setSavingId(editingId);
    setMessage("");
    try {
      await authService.updateUser(editingId, form);
      setMessage("User updated successfully.");
      setEditingId(null);
      setForm(emptyForm);
      await loadUsers();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to update user");
    } finally {
      setSavingId(null);
    }
  };

  const handleStatusChange = async (user: User) => {
    const status = user.status === "suspended" ? "active" : "suspended";
    setSavingId(user._id);
    setMessage("");
    try {
      await authService.updateUserStatus(user._id, status);
      setMessage(`User ${status === "suspended" ? "suspended" : "reactivated"} successfully.`);
      await loadUsers();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to update user status");
    } finally {
      setSavingId(null);
    }
  };

  const startEditing = (user: User) => {
    setEditingId(user._id);
    setForm({ name: user.name, email: user.email, role: user.role });
    setMessage("");
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
        <p className="mt-1 text-sm text-gray-500">View and manage registered users from the admin API.</p>
      </div>

      {message && <p className="mb-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">{message}</p>}

      {editingId && (
        <form onSubmit={handleSubmit} className="mb-6 grid gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:grid-cols-3">
          <input required placeholder="Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="rounded-lg border p-3" />
          <input required type="email" placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="rounded-lg border p-3" />
          <select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value as User["role"] })} className="rounded-lg border p-3">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <div className="flex gap-3 md:col-span-3">
            <button type="submit" disabled={savingId === editingId} className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50">
              {savingId === editingId ? "Saving..." : "Save Changes"}
            </button>
            <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }} className="rounded-lg border px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
          </div>
        </form>
      )}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Joined</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading && <tr><td colSpan={6} className="px-6 py-8"><LoadingSpinner label="Loading users..." /></td></tr>}
            {!loading && users.length === 0 && <tr><td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-500">No users found.</td></tr>}
            {!loading && users.map((user) => {
              const suspended = user.status === "suspended";
              return (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 text-sm capitalize text-gray-500">{user.role}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4"><span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${suspended ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>{suspended ? "Suspended" : "Active"}</span></td>
                  <td className="px-6 py-4"><div className="flex gap-3">
                    <button type="button" onClick={() => startEditing(user)} className="text-sm text-blue-600 hover:underline">Edit</button>
                    <button type="button" onClick={() => void handleStatusChange(user)} disabled={savingId === user._id} className="text-sm text-red-600 hover:underline disabled:opacity-50">{savingId === user._id ? "Saving..." : suspended ? "Activate" : "Suspend"}</button>
                  </div></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
