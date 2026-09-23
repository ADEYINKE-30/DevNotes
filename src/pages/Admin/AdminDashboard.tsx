import { useEffect, useState } from "react";
import StatsCard from "../../components/admin/StatsCard";
import { blogService, type BlogPost } from "../../services/blogService";
import { tutorialService, type Tutorial } from "../../services/tutorialService";
import { quizService, type Quiz } from "../../services/quizService";
import { communityService } from "../../services/communityService";
import type { Discussion } from "../../types/community";

const AdminDashboard = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAdminOverview = async () => {
      try {
        const [postData, tutorialData, quizData, discussionData] = await Promise.all([
          blogService.getPosts({ page: 1, limit: 100 }),
          tutorialService.getTutorials({ page: 1, limit: 100 }),
          quizService.getQuizzes({ page: 1, limit: 100 }),
          communityService.getDiscussions(),
        ]);
        setPosts(postData.posts);
        setTutorials(tutorialData.tutorials);
        setQuizzes(quizData.quizzes);
        setDiscussions(discussionData);
      } catch (error) {
        console.error("Failed to load admin overview:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAdminOverview();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Administration</p>
        <h1 className="mt-1 text-2xl font-bold text-gray-900">Content Overview</h1>
        <p className="mt-2 text-sm text-gray-500">Monitor and manage the platform content and community activity.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Articles"
          value={loading ? "..." : posts.length}
          icon="articles"
          change="Published content"
          href="/admin/articles"
        />
        <StatsCard
          title="Tutorials"
          value={loading ? "..." : tutorials.length}
          icon="videos"
          change="Learning content"
          href="/admin/videos"
        />
        <StatsCard
          title="Quizzes"
          value={loading ? "..." : quizzes.length}
          icon="quizzes"
          change="Assessment content"
          href="/admin/quizzes"
        />
        <StatsCard
          title="Discussions"
          value={loading ? "..." : discussions.length}
          icon="community"
          change="Community threads"
          href="/community"
        />
      </div>

      <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-6">
        <h2 className="text-lg font-bold text-gray-900">Create Content</h2>
        <p className="mt-1 text-sm text-gray-600">Publish new learning content from the admin panel.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href="/admin/articles" className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">
            + Post Article
          </a>
          <a href="/admin/videos" className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700">
            + Post Video
          </a>
        </div>
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Recent Articles</h2>
          <div className="space-y-3">
            {posts.slice(0, 4).map((post) => (
              <div key={post._id} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{post.title}</p>
                  <p className="text-xs text-gray-500">{post.category} · {post.published ? "Published" : "Draft"}</p>
                </div>
                <span className="text-xs text-gray-400">{post.readTime}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Recent Discussions</h2>
          <div className="space-y-3">
            {discussions.slice(0, 4).map((post) => (
              <div key={post._id} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{post.title}</p>
                  <p className="text-xs text-gray-500">{post.category || "General"} · {post.commentCount || 0} comments</p>
                </div>
                <span className="text-xs text-gray-400">{post.likesCount} likes</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;