import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home";
import Blog from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";
import { Videos, VideoDetails } from "../pages/Videos";
import { Quiz } from "../pages/Quiz";
import { Search } from "../pages/Search";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Dashboard from "../pages/Dashboard";
import Community from "../pages/Community/Community";
import Thread from "../pages/Community/Thread";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import ManageArticles from "../pages/Admin/ManageArticles";
import ManageUsers from "../pages/Admin/ManageUsers";
import Analytics from "../pages/Admin/Analytics";
import ManageQuizzes from "../pages/Admin/ManageQuizzes";
import ManageVideos from "../pages/Admin/ManageVideos";
import Bookmarks from "../pages/Bookmarks/Bookmarks";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import AdminRoute from "../components/auth/AdminRoute";
import AIChat from "../components/ai/AIChat";
import type { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "blog/:slug",
        element: <BlogDetails />,
      },
      {
        path: "videos",
        element: <Videos />,
      },
      {
        path: "videos/:videoId",
        element: <VideoDetails />,
      },
      {
        path: "quiz/:quizId",
        element: <Quiz />,
      },
      {
        path: "quiz",
        element: <Quiz />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "assistant",
        element: <AIChat isFullPage />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "bookmarks",
        element: <Bookmarks />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "community",
        element: <Community />,
      },
      {
        path: "community/:threadId",
        element: <Thread />,
      },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
      {
        path: "admin/articles",
        element: (
          <AdminRoute>
            <ManageArticles />
          </AdminRoute>
        ),
      },
      {
        path: "admin/users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "admin/analytics",
        element: (
          <AdminRoute>
            <Analytics />
          </AdminRoute>
        ),
      },
      {
        path: "admin/quizzes",
        element: (
          <AdminRoute>
            <ManageQuizzes />
          </AdminRoute>
        ),
      },
      {
        path: "admin/videos",
        element: (
          <AdminRoute>
            <ManageVideos />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;