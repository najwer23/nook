import { ForgotPassword } from '@app/auth/forgotPassword/ForgotPassword';
import { ForgotPasswordOtp } from '@app/auth/forgotPasswordOtp/ForgotPasswordOtp';
import { Login } from '@app/auth/login/Login';
import { Logout } from '@app/auth/logout/Logout';
import { SignUp } from '@app/auth/signup/SignUp';
import { Layout } from '@app/layout/Layout';
import { BlogPostCreator } from '@app/pages/blog-post-creator/BlogPostCreator';
import { ErrorNotFound } from '@app/pages/error/ErrorNotFound';
import { StockQuotes } from '@app/pages/stock-quotes/StockQuotes';
import { Visitors } from '@app/pages/visitors/Visitors';
import { Weather } from '@app/pages/weather/Weather';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Home } from '../pages/home/Home';
import { ProtectedRoute } from './ProtectedRoute';
import { ScrollToTop } from './ScrollToTop';

export const router = createHashRouter([
  {
    path: '/',
    element: (
      <>
        <ScrollToTop />
        <Layout type={'home'} />
      </>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/stock-quotes',
        element: <StockQuotes />,
      },
      {
        path: '/weather',
        element: <Weather />,
      },
      {
        path: '/visitors',
        element: <Visitors />,
      },
      {
        path: '/blog-post-creator',
        element: <BlogPostCreator />,
      },
      {
        path: '*',
        element: <ErrorNotFound />,
      },
    ],
  },
  {
    path: '/auth/',
    element: (
      <>
        <ScrollToTop />
        <Layout type="auth" />
      </>
    ),
    children: [
      {
        path: '/auth/login',
        element: <Login />,
      },
      {
        path: '/auth/forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: '/auth/forgot-password/otp/:otp',
        element: <ForgotPasswordOtp />,
      },
      {
        path: '/auth/sign-up',
        element: <SignUp />,
      },
    ],
  },
  {
    path: '/in/',
    element: (
      <>
        <ProtectedRoute>
          <ScrollToTop />
          <Layout type="in" />
        </ProtectedRoute>
      </>
    ),
    children: [
      {
        path: '/in/weight',
        element: <div>weight</div>,
      },
      {
        path: '/in/dashboard',
        element: <div>dashboard</div>,
      },
      {
        path: '/in/stock-quotes',
        element: <StockQuotes />,
      },
      {
        path: '/in/weather',
        element: <Weather />,
      },
      {
        path: '/in/visitors',
        element: <Visitors />,
      },
      {
        path: '/in/blog-post-creator',
        element: <BlogPostCreator />,
      },
      {
        path: '*',
        element: <ErrorNotFound />,
      },
    ],
  },
  {
    path: '/logout',
    element: <Logout />,
  },
]);

export const RouterHash = () => <RouterProvider router={router} />;
