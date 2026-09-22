import { useEffect, useState, type FC } from "react";
import { notificationService, type Notification } from "../../../services/notificationService";

const formatNotificationTime = (createdAt: string) => {
  const elapsed = Date.now() - new Date(createdAt).getTime();
  const minutes = Math.max(1, Math.floor(elapsed / 60000));
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
};

const Notifications: FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const [notificationData, count] = await Promise.all([
        notificationService.getNotifications({ page: 1, limit: 10 }),
        notificationService.getUnreadCount(),
      ]);
      setNotifications(notificationData.notifications);
      setUnreadCount(count);
    } catch {
      setNotifications([]);
      setUnreadCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, [open]);

  const markAsRead = async (notification: Notification) => {
    if (notification.read) return;
    try {
      const updated = await notificationService.markAsRead(notification._id);
      setNotifications((current) => current.map((item) => item._id === updated._id ? updated : item));
      setUnreadCount((current) => Math.max(0, current - 1));
    } catch {
      // Keep the notification visible if the request fails.
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications((current) => current.map((item) => ({ ...item, read: true })));
      setUnreadCount(0);
    } catch {
      // Keep the current state if the request fails.
    }
  };

  return (
    <div
      className={`absolute right-0 z-50 mt-2 w-[min(20rem,calc(100vw-2rem))] rounded-panel border border-line bg-surface-elevated shadow-sm transition-opacity duration-150 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-hidden={!open}
      aria-label="Notifications"
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <h4 className="text-sm font-semibold text-content">Notifications</h4>
        <button onClick={onClose} className="rounded-control px-1 text-xs text-content-muted hover:text-content focus-visible:outline-none">Close</button>
      </div>

      <div className="max-h-64 overflow-y-auto">
        {loading ? (
          <div className="px-4 py-6 text-center text-sm text-content-muted">Loading notifications...</div>
        ) : notifications.map((n) => (
          <div
            key={n._id}
            onClick={() => markAsRead(n)}
            className={`cursor-pointer border-b border-line px-4 py-3 hover:bg-canvas ${n.read ? "" : "bg-accent-subtle/40"}`}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-content">{n.title}</p>
              <p className="text-xs text-content-muted">{formatNotificationTime(n.createdAt)}</p>
            </div>
            <p className="mt-1 text-xs text-content-secondary">{n.message}</p>
          </div>
        ))}
        {!loading && notifications.length === 0 && (
          <div className="px-4 py-6 text-center text-sm text-content-muted">No notifications</div>
        )}
      </div>

      <div className="px-4 py-3">
        <button onClick={markAllAsRead} disabled={unreadCount === 0} className="w-full rounded-control border border-line bg-canvas px-3 py-2 text-sm text-content hover:border-border-strong disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none">Mark all read</button>
      </div>
    </div>
  );
};

export default Notifications;
