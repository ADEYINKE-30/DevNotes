import StatsCard from "../../components/admin/StatsCard";
import { posts } from "../../constants/posts";
import { mockVideos } from "../../data/mockVideos";
import { mockForumPosts } from "../../data/mockCommunity";

const AdminDashboard = () => {
  const totalPosts = posts.length;
  const totalVideos = mockVideos.length;
  const totalDiscussions = mockForumPosts.length;
  const totalUsers = 156;

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-gray-900">Dashboard Overview</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Articles"
          value={totalPosts}
          icon="📝"
          change="+2 this week"
          changeType="positive"
        />
        <StatsCard
          title="Total Videos"
          value={totalVideos}
          icon="🎥"
          change="+4 this week"
          changeType="positive"
        />
        <StatsCard
          title="Total Users"
          value={totalUsers}
          icon="👥"
          change="+12 this week"
          changeType="positive"
        />
        <StatsCard
          title="Discussions"
          value={totalDiscussions}
          icon="💬"
          change="+3 this week"
          changeType="positive"
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Recent Articles</h2>
          <div className="space-y-3">
            {posts.slice(0, 4).map((post) => (
              <div key={post.id} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{post.title}</p>
                  <p className="text-xs text-gray-500">{post.category} · {post.date}</p>
                </div>
                <span className="text-xs text-gray-400">{post.readTime}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Recent Discussions</h2>
          <div className="space-y-3">
            {mockForumPosts.slice(0, 4).map((post) => (
              <div key={post.id} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{post.title}</p>
                  <p className="text-xs text-gray-500">{post.category} · {post.comments.length} comments</p>
                </div>
                <span className="text-xs text-gray-400">{post.viewCount} views</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;