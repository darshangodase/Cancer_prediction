import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout
import AppLayout from './AppLayout';

// Pages
import Home from '../pages/Home';
import About from '../pages/About';
import Predict from '../pages/Predict';
import Result from '../pages/Result';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'predict',
        element: <Predict />
      },
      {
        path: 'result',
        element: <Result />
      },
      {
        path: '*',
        element: <Navigate to="/" replace />
      }
    ]
  }
]);

const AppRoutes = () => {
  return (
    <AnimatePresence mode="wait">
      <RouterProvider router={router} />
    </AnimatePresence>
  );
};

export default AppRoutes; 