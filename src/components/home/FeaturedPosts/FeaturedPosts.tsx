import { posts } from "../../../constants/posts";
import { Link } from "react-router-dom";

const FeaturedPosts = () => {
  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:py-16" aria-labelledby="featured-heading">
      <div className="flex items-end justify-between gap-4 border-b border-line pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Editor&apos;s pick</p>
          <h2 id="featured-heading" className="mt-2 text-3xl font-semibold tracking-tight text-content sm:text-4xl">Featured Articles</h2>
        </div>
        <Link to="/blog" className="hidden text-sm font-semibold text-accent hover:text-accent-hover sm:block">View all <span aria-hidden="true">-&gt;</span></Link>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(16rem,0.7fr)]">
        {posts.slice(0, 1).map((post) => (
          <Link key={post.id} to={`/blog/${post.slug}`} className="group grid border-y border-line bg-surface sm:grid-cols-[1.05fr_0.95fr]">
            <div className="min-h-64 overflow-hidden bg-canvas sm:min-h-full"><img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105" /></div>
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">{post.category}</span>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-content group-hover:text-accent sm:text-3xl lg:text-4xl">{post.title}</h3>
              <p className="mt-3 text-sm leading-6 text-content-secondary">{post.description}</p>
              <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1 text-xs text-content-muted"><span>{post.date}</span><span>{post.readTime}</span><span>{post.author}</span></div>
              <span className="mt-6 text-sm font-semibold text-accent">Read the feature <span aria-hidden="true">-&gt;</span></span>
            </div>
          </Link>
        ))}
        <div className="divide-y divide-line border-y border-line">
          {posts.slice(1, 3).map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group block py-5 first:pt-0 last:pb-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">{post.category}</p>
              <h3 className="mt-2 text-lg font-semibold text-content group-hover:text-accent">{post.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-content-secondary">{post.description}</p>
              <p className="mt-3 text-xs text-content-muted">{post.date} &middot; {post.readTime}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;