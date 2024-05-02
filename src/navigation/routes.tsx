import { BaseLayout } from '@/pages/common/BaseLayout';
import ErrorPage from '@/pages/common/ErrorPage';
import NotFoundPage from '@/pages/common/NotFoundPage';
import ContactListPage from '@/pages/contactList/ContactListPage';
import { Navigate, createBrowserRouter } from 'react-router-dom';

export const routes = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      {
        element: <BaseLayout />,
        children: [
          { index: true, element: <Navigate to="/contact-list" replace /> },
          { path: '/contact-list', element: <ContactListPage /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
