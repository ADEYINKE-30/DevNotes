import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { blogService, type BlogPost } from "../../services/blogService";
import ArticleContent from "../../components/blog/ArticleContent";
import BookmarkButton from "../../components/blog/BookmarkButton";
import LikeButton from "../../components/blog/LikeButton";
import ShareButton from "../../components/blog/ShareButton";

const BlogDetails = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        setError("");
        const postData = await blogService.getPostBySlug(slug);
        setPost(postData);
      } catch (err: any) {
        setError(err.message || "Failed to load blog post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-12">
        <Link
          to="/blog"
          className="mb-6 inline-block font-medium text-blue-600 hover:text-blue-800"
        >
          ← Back to Blog
        </Link>
        <div className="text-center py-12">
          <p className="text-gray-600">Loading article...</p>
        </div>
      </section>
    );
  }

  if (error || !post) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Blog not found</h1>
        <p className="mt-4 text-gray-600">
          {error || "The article you're looking for doesn't exist."}
        </p>
        <Link
          to="/blog"
          className="mt-6 inline-block font-medium text-blue-600 hover:text-blue-800"
        >
          ← Back to Blog
        </Link>
      </section>
    );
  }

  // Map backend post to component format
  const mappedPost = {
    id: post._id as any,
    title: post.title,
    description: post.description,
    content: post.content || post.description,
    category: post.category,
    author: post.author,
    readTime: post.readTime,
    slug: post.slug,
    date: post.publishedAt || post.createdAt,
    image: post.image || post.thumbnail,
  };

  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      <Link
        to="/blog"
        className="mb-6 inline-block font-medium text-blue-600 hover:text-blue-800"
      >
        ← Back to Blog
      </Link>

      <ArticleContent post={mappedPost} />

      {/* Interaction Buttons */}
      <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-gray-200 pt-6">
        <LikeButton postId={mappedPost.id} />
        <BookmarkButton
          postId={mappedPost.id}
          title={mappedPost.title}
          description={mappedPost.description}
          category={mappedPost.category}
          slug={mappedPost.slug}
          image={mappedPost.image}
        />
        <ShareButton
          title={post.title}
          url={window.location.href}
        />
      </div>
    </section>
  );
};

export default BlogDetails;
