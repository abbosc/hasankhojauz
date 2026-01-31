import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import PasswordGate from './components/PasswordGate';
import ErrorPage from './components/ErrorPage';

// Public pages
import HomePage from './pages/HomePage';
import BlogPostPage from './pages/BlogPostPage';
import CategoryPage from './pages/CategoryPage';
import AboutPage from './pages/AboutPage';

// Admin pages
import AdminLogin from './pages/admin/Login';
import PostsList from './pages/admin/PostsList';
import PostEditor from './pages/admin/PostEditor';
import CategoriesManager from './pages/admin/Categories';
import AboutEditor from './pages/admin/AboutEditor';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'blog/:slug', element: <BlogPostPage /> },
      { path: 'category/:slug', element: <CategoryPage /> },
      { path: 'about', element: <AboutPage /> },
    ],
  },
  {
    path: '/admin',
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <AdminLogin /> },
      {
        element: (
          <PasswordGate>
            <AdminLayout />
          </PasswordGate>
        ),
        children: [
          { path: 'posts', element: <PostsList /> },
          { path: 'posts/new', element: <PostEditor /> },
          { path: 'posts/:id', element: <PostEditor /> },
          { path: 'categories', element: <CategoriesManager /> },
          { path: 'about', element: <AboutEditor /> },
        ],
      },
    ],
  },
]);
