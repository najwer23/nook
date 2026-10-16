import { useAuthStore } from '@app/auth/Auth.store';
import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { storageItemGet } from '@app/storage/storageItemGet';
import { useMutation } from '@tanstack/react-query';
import { type FormType } from 'najwer23morsels/lib/Form';
import { FormLogin } from 'najwer23morsels/lib/FormLogin';

import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { queryLogin } from './Login.query';

export const Login = () => {
  const isAuth = useAuthStore.use.isAuth();
  const setAuth = useAuthStore.use.setAuth();
  const navigate = useNavigate();
  const [isLayoutLoading, setIsLayoutLoading] = useState(true);

  useDocumentTitle(`Login | ${import.meta.env.VITE_ANALYTICS_APP_NAME}`);

  const { mutate, isPending, isError, data, error } = useMutation({
    mutationKey: ['queryLogin', 'queryLogin'],
    mutationFn: queryLogin,
  });

  useLayoutEffect(() => {
    if (data?.code === 'OK') {
      setAuth(true);
    }
    if (data?.code === 'OK' || isAuth || storageItemGet(sessionStorage, 'tokenJWTaccess')) {
      navigate('/in/dashboard');
    } else {
      setIsLayoutLoading(false);
    }
  }, [data?.code, isAuth]);

  const handleOnSubmit = (form: FormType) => {
    if (Object.values(form).some(({ error }) => error)) return;
    mutate(Object.fromEntries(Object.entries(form).map(([key, { value }]) => [key, value])));
  };

  if (isAuth) {
    return;
  }

  if (isLayoutLoading) {
    return;
  }

  return (
    <FormLogin
      isError={isError}
      isPending={isPending}
      isSuccess={data?.code === 'OK'}
      onSubmit={handleOnSubmit}
      errorMsg={error?.message}
      successMsg={data?.message}
      onNavigate={navigate}
      linkMainPage={{
        link: '/',
        text: import.meta.env.VITE_ANALYTICS_APP_NAME,
      }}
      linkSignUp={{
        link: '/auth/sign-up',
        text: 'sign up',
      }}
      linkForgotPassword={{
        link: '/auth/forgot-password',
        text: 'forgot password',
      }}
    />
  );
};
