import type { FC } from "react";

interface NotificationItem {
  id: string;
  title: string;
  body?: string;
  time?: string;
}

const mockNotifications: NotificationItem[] = [
  { id: "1", title: "New comment on your post", body: "Alice left a comment.", time: "2h" },
  { id: "2", title: "Weekly digest is ready", body: "Your summary is available.", time: "1d" },
  { id: "3", title: "New follower", body: "Bob is now following you.", time: "3d" },
];

const Notifications: FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  return (
    <div
      className={`absolute right-0 mt-2 w-80 rounded-lg border border-slate-700 bg-slate-900 shadow-lg transition-opacity duration-150 z-50 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-hidden={!open}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
        <h4 className="text-sm font-semibold text-white">Notifications</h4>
        <button onClick={onClose} className="text-slate-400 hover:text-white">Close</button>
      </div>

      <div className="max-h-64 overflow-y-auto">
        {mockNotifications.map((n) => (
          <div key={n.id} className="px-4 py-3 hover:bg-slate-800 border-b border-slate-800">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-white">{n.title}</p>
              <p className="text-xs text-slate-400">{n.time}</p>
            </div>
            {n.body && <p className="mt-1 text-xs text-slate-400">{n.body}</p>}
          </div>
        ))}
        {mockNotifications.length === 0 && (
          <div className="px-4 py-6 text-center text-sm text-slate-400">No notifications</div>
        )}
      </div>

      <div className="px-4 py-3">
        <button className="w-full rounded-md bg-slate-800 px-3 py-2 text-sm text-white hover:bg-slate-700">Mark all read</button>
      </div>
    </div>
  );
};

export default Notifications;
