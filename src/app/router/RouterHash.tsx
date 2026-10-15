import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Home } from '../pages/home/Home';
import { ScrollToTop } from './ScrollToTop';

export const router = createHashRouter([
  {
    path: '/',
    element: (
      <>
        <ScrollToTop />
        <Home />
        {/* <ScrollRestoration /> */}
      </>
    ),
  },
]);

export const RouterHash = () => <RouterProvider router={router} />;
