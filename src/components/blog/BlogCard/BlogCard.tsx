import type { BlogPost } from "../../../types";
import { Link } from "react-router-dom";
import { Clock, FileText } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  // Support both 'image' and 'thumbnail' fields
  const imageSrc = post.image || (post as any).thumbnail || "";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10">
      <div className="flex h-48 items-center justify-center overflow-hidden bg-slate-100 dark:bg-slate-700">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center text-slate-400 dark:text-slate-500">
            <FileText aria-hidden="true" className="h-10 w-10" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        {/* Category Badge */}
        <span className="inline-block w-fit rounded-full bg-purple-500/20 px-3 py-1 text-sm font-medium text-purple-600 dark:text-purple-300 border border-purple-500/30">
          {post.category}
        </span>

        {/* Title */}
        <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
          {post.title}
        </h2>

        {/* Description */}
        <p className="mt-3 text-slate-600 dark:text-slate-400 line-clamp-2">
          {post.description}
        </p>

        {/* Metadata & CTA */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
          <small className="flex items-center gap-1 text-slate-500 dark:text-slate-500"><Clock aria-hidden="true" className="h-3.5 w-3.5" /> {post.readTime}</small>

          <Link
            to={`/blog/${post.slug}`}
            className="font-semibold text-purple-600 dark:text-purple-400 transition hover:text-purple-700 dark:hover:text-purple-300"
          >
            Read →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;