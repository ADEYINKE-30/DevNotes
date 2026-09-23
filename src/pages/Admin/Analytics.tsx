import StatsCard from "../../components/admin/StatsCard";

const Analytics = () => {
  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-gray-900">Analytics</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard title="Page Views" value="12,847" icon="views" change="+18% this month" changeType="positive" />
        <StatsCard title="Active Users" value="1,234" icon="users" change="+7% this month" changeType="positive" />
        <StatsCard title="Bounce Rate" value="32.5%" icon="bounce" change="-2.1% this month" changeType="positive" />
        <StatsCard title="Avg. Session" value="4m 32s" icon="⏱️" change="+12s this month" changeType="positive" />
        <StatsCard title="New Signups" value="89" icon="signups" change="+23 this week" changeType="positive" />
        <StatsCard title="Course Completion" value="67%" icon="✅" change="+5% this month" changeType="positive" />
      </div>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Popular Content</h2>
        <div className="space-y-4">
          {[
            { title: "Getting Started with React", views: 2340, category: "React" },
            { title: "JavaScript Array Methods Explained", views: 1890, category: "JavaScript" },
            { title: "Understanding TypeScript", views: 1560, category: "TypeScript" },
            { title: "HTML5 Semantic Elements", views: 1340, category: "HTML" },
            { title: "CSS Flexbox - Complete Guide", views: 1200, category: "CSS" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500">{item.category}</p>
              </div>
              <span className="text-sm font-semibold text-gray-700">{item.views.toLocaleString()} views</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;