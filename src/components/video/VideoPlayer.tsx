interface VideoPlayerProps {
  youtubeId: string;
  title: string;
}

const VideoPlayer = ({ youtubeId, title }: VideoPlayerProps) => {
  return (
    <div className="aspect-video overflow-hidden rounded-xl bg-black shadow-lg">
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
};

export default VideoPlayer;