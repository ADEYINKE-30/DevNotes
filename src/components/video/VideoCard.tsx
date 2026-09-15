import { Link } from "react-router-dom";
import type { Video } from "../../data/mockVideos";
import { mockWatchProgress } from "../../data/mockVideos";
import WatchProgress from "./WatchProgress";

interface VideoCardProps {
  video: Video;
}

const VideoCard = ({ video }: VideoCardProps) => {
  const progress = mockWatchProgress[video.id] || 0;

  const formatViews = (views: number) => {
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  return (
    <Link
      to={`/videos/${video.id}`}
      className="group block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="aspect-video w-full object-cover"
          loading="lazy"
        />
        <span className="absolute bottom-2 right-2 rounded-md bg-black/80 px-2 py-1 text-xs font-medium text-white">
          {video.duration}
        </span>
        {progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700/50">
            <div
              className="h-full bg-blue-500 transition-all"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        )}
      </div>

      <div className="p-4">
        <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
          {video.category}
        </span>

        <h3 className="mt-2 text-base font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2">
          {video.title}
        </h3>

        <p className="mt-1 text-xs text-gray-500">{video.instructor}</p>

        <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
          <span>{formatViews(video.views)} views</span>
          <span>{new Date(video.publishedAt).toLocaleDateString()}</span>
        </div>

        <div className="mt-2">
          <WatchProgress progress={progress} />
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;