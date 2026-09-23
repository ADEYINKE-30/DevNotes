import type { BlogPost } from "../../types/blog";
import type { ReactElement } from "react";

interface ArticleContentProps {
  post: BlogPost;
}

const ArticleContent = ({ post }: ArticleContentProps) => {
  return (
    <article className="prose prose-lg max-w-none">
      {/* Category Badge */}
      <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
        {post.category}
      </span>

      {/* Title */}
      <h1 className="mt-4 text-4xl font-bold text-gray-900 dark:text-white">{post.title}</h1>

      {/* Meta Info */}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
        {post.author && <span>By {post.author}</span>}
        {post.date && <span>{post.date}</span>}
        <span>⏱️ {post.readTime}</span>
      </div>

      {/* Featured Image */}
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="mt-6 h-96 w-full rounded-xl object-cover"
        />
      )}

      {/* Description */}
      <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-slate-300">
        {post.description}
      </p>

      {/* Full Content */}
      {post.content && <MarkdownContent content={post.content} />}

      {/* Tags / Category Footer */}
      <div className="mt-10 border-t border-gray-200 pt-6 dark:border-slate-700">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-gray-500">Category:</span>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
            {post.category}
          </span>
        </div>
      </div>
    </article>
  );
};

const MarkdownContent = ({ content }: { content: string }) => {
  const lines = content.trim().split("\n");
  const blocks: ReactElement[] = [];
  let list: string[] = [];
  let code: string[] = [];
  let inCode = false;

  const flushList = () => {
    if (list.length) {
      blocks.push(<ul key={`list-${blocks.length}`} className="list-disc space-y-2 pl-6"><>{list.map((item) => <li key={item}>{item}</li>)}</></ul>);
      list = [];
    }
  };

  lines.forEach((line, index) => {
    if (line.trim().startsWith("```")) {
      if (inCode) {
        blocks.push(<pre key={`code-${index}`} className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100"><code>{code.join("\n")}</code></pre>);
        code = [];
      }
      inCode = !inCode;
      return;
    }
    if (inCode) {
      code.push(line);
      return;
    }
    const trimmed = line.trim();
    if (!trimmed) return;
    if (trimmed.startsWith("- ")) {
      list.push(trimmed.slice(2));
      return;
    }
    flushList();
    if (trimmed.startsWith("# ")) blocks.push(<h2 key={index} className="text-3xl font-bold text-gray-900 dark:text-white">{trimmed.slice(2)}</h2>);
    else if (trimmed.startsWith("## ")) blocks.push(<h3 key={index} className="text-2xl font-semibold text-gray-900 dark:text-white">{trimmed.slice(3)}</h3>);
    else blocks.push(<p key={index}>{trimmed}</p>);
  });
  flushList();
  return <div className="mt-8 space-y-6 text-lg leading-8 text-gray-700 dark:text-slate-300">{blocks}</div>;
};

export default ArticleContent;