const ManageUsers = () => {
  const mockUsers = [
    { id: 1, name: "JaneDev", email: "jane@example.com", role: "User", joined: "2026-06-01", status: "Active" },
    { id: 2, name: "WebWizard", email: "wizard@example.com", role: "User", joined: "2026-06-10", status: "Active" },
    { id: 3, name: "CodeNinja", email: "ninja@example.com", role: "Moderator", joined: "2026-05-15", status: "Active" },
    { id: 4, name: "CSSQueen", email: "queen@example.com", role: "User", joined: "2026-06-20", status: "Suspended" },
    { id: 5, name: "Adepoju Adeyinka", email: "adepoju@example.com", role: "Admin", joined: "2026-01-01", status: "Active" },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Manage Users</h1>
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
            {mockUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{user.role}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{user.joined}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    user.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="text-sm text-blue-600 hover:underline">Edit</button>
                    <button className="text-sm text-red-600 hover:underline">Suspend</button>
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

export default ManageUsers;