import BlogCard from "../../blog/BlogCard";
import { posts } from "../../../constants/posts";
import { Link } from "react-router-dom";

const LatestPosts = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-3">
        <p className="text-purple-400 font-semibold uppercase tracking-wider text-sm">
          Fresh Content
        </p>
      </div>
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-4xl font-bold text-white">
          Latest Articles
        </h2>
        <Link
          to="/blog"
          className="text-purple-400 hover:text-purple-300 transition font-medium"
        >
          View All →
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default LatestPosts;