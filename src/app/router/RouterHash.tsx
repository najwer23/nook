import { ForgotPassword } from '@app/auth/forgotPassword/ForgotPassword';
import { ForgotPasswordOtp } from '@app/auth/forgotPasswordOtp/ForgotPasswordOtp';
import { Login } from '@app/auth/login/Login';
import { SignUp } from '@app/auth/signup/SignUp';
import { Layout } from '@app/layout/Layout';
import { ErrorNotFound } from '@app/pages/error/ErrorNotFound';
import { StockQuotes } from '@app/pages/stock-quotes/StockQuotes';
import { Weather } from '@app/pages/weather/Weather';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Home } from '../pages/home/Home';
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
]);

export const RouterHash = () => <RouterProvider router={router} />;
