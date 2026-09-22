import { posts } from "../../../constants/posts";
import { Link } from "react-router-dom";

const LatestPosts = () => {
  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:py-16" aria-labelledby="latest-heading">
      <div className="flex flex-col justify-between gap-3 border-b border-line pb-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Fresh thinking</p>
          <h2 id="latest-heading" className="mt-2 text-3xl font-semibold tracking-tight text-content sm:text-4xl">Latest Articles</h2>
          <p className="mt-2 text-sm text-content-secondary">Short, practical reads for the problems developers meet every day.</p>
        </div>
        <Link to="/blog" className="text-sm font-semibold text-accent hover:text-accent-hover">View all <span aria-hidden="true">-&gt;</span></Link>
      </div>

      <div className="mt-2 divide-y divide-line border-b border-line">
        {posts.slice(3, 8).map((post) => (
          <Link key={post.id} to={`/blog/${post.slug}`} className="group grid gap-3 py-6 sm:grid-cols-[2rem_minmax(0,1fr)_10rem] sm:gap-6">
            <span className="hidden pt-1 font-mono text-xs text-content-muted sm:block">{String(post.id).padStart(2, "0")}</span>
            <div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-content-muted"><span className="font-semibold text-accent">{post.category}</span><span>{post.date}</span><span>{post.readTime}</span></div>
              <h3 className="mt-2 text-xl font-semibold text-content group-hover:text-accent">{post.title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-content-secondary">{post.description}</p>
            </div>
            <img src={post.image} alt="" className="aspect-4/3 w-full rounded-panel object-cover grayscale transition duration-200 group-hover:grayscale-0" loading="lazy" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LatestPosts;