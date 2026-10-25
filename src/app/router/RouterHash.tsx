import { ForgotPassword } from '@app/auth/forgotpassword/ForgotPassword';
import { ForgotPasswordOtp } from '@app/auth/forgotpasswordotp/ForgotPasswordOtp';
import { Login } from '@app/auth/login/Login';
import { Logout } from '@app/auth/logout/Logout';
import { SignUp } from '@app/auth/signup/SignUp';
import { Layout } from '@app/layout/Layout';
import { BlogPostCreator } from '@app/pages/blogpostcreator/BlogPostCreator';
import { ErrorNotFound } from '@app/pages/error/ErrorNotFound';
import { Ex } from '@app/pages/ex/Ex';
import { StockQuotes } from '@app/pages/stockquotes/StockQuotes';
import { Vacations } from '@app/pages/vacations/Vacations';
import { Visitors } from '@app/pages/visitors/Visitors';
import { Weather } from '@app/pages/weather/Weather';
import { Weight } from '@app/pages/weight/Weight';
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
        path: '/vacations',
        element: <Vacations />,
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
        element: <Weight />,
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
        path: '/in/push-ups',
        element: <Ex workoutName={'Push-ups'} key="Push-ups" />,
      },
      {
        path: '/in/squats',
        element: <Ex workoutName={'Squats'} key="Squats" />,
      },
      {
        path: '/in/sit-ups',
        element: <Ex workoutName={'Sit-ups'} key="Sit-ups" />,
      },
      {
        path: '/in/pull-ups',
        element: <Ex workoutName={'Pull-ups'} key="Pull-ups" />,
      },
      {
        path: '/in/vacations',
        element: <Vacations />,
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
