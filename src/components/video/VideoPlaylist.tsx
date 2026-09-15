import { Link } from "react-router-dom";
import type { Video } from "../../data/mockVideos";
import { mockWatchProgress } from "../../data/mockVideos";

interface VideoPlaylistProps {
  playlistName: string;
  videos: Video[];
  currentVideoId: string;
}

const VideoPlaylist = ({ playlistName, videos, currentVideoId }: VideoPlaylistProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-4 py-3">
        <h3 className="font-semibold text-gray-900">{playlistName}</h3>
        <p className="text-xs text-gray-500">{videos.length} videos</p>
      </div>

      <ul className="divide-y divide-gray-100">
        {videos.map((video, index) => {
          const progress = mockWatchProgress[video.id] || 0;
          const isActive = video.id === currentVideoId;

          return (
            <li key={video.id}>
              <Link
                to={`/videos/${video.id}`}
                className={`flex items-start gap-3 px-4 py-3 transition ${
                  isActive
                    ? "bg-blue-50"
                    : "hover:bg-gray-50"
                }`}
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-500">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-sm ${
                      isActive
                        ? "font-semibold text-blue-600"
                        : "font-medium text-gray-900"
                    }`}
                  >
                    {video.title}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-400">
                    {video.duration}
                  </p>
                  {progress > 0 && (
                    <div className="mt-1 h-1 w-full rounded-full bg-gray-100">
                      <div
                        className="h-1 rounded-full bg-blue-500"
                        style={{ width: `${progress * 100}%` }}
                      />
                    </div>
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default VideoPlaylist;