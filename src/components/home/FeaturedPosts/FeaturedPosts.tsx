import BlogCard from "../../blog/BlogCard";
import { posts } from "../../../constants/posts";

const FeaturedPosts = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-3">
        <p className="text-purple-400 font-semibold uppercase tracking-wider text-sm">
          Handpicked
        </p>
      </div>
      <h2 className="mb-10 text-4xl font-bold text-white">
        Featured Articles
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedPosts;