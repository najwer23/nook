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

  const {
    mutate: mutateQueryLogin,
    isPending: isPendingQueryLogin,
    isError: isErrorQueryLogin,
    data: dataQueryLogin,
    error: errorQueryLogin,
  } = useMutation({
    mutationKey: ['queryLogin', 'queryLogin'],
    mutationFn: queryLogin,
  });

  useLayoutEffect(() => {
    if (dataQueryLogin?.code === 'OK') {
      setAuth(true);
    }

    if (dataQueryLogin?.code === 'OK' || isAuth || storageItemGet(sessionStorage, 'tokenJWTaccess')) {
      navigate('/in/dashboard');
    } else {
      setIsLayoutLoading(false);
    }
  }, [dataQueryLogin?.code, isAuth]);

  const handleOnSubmitLogin = (form: FormType) => {
    if (Object.values(form).some(({ error }) => error)) return;

    const dataForm = Object.fromEntries(Object.entries(form).map(([key, { value }]) => [key, value]));

    mutateQueryLogin(dataForm);
  };

  if (isAuth || isLayoutLoading) {
    return null;
  }

  return (
    <FormLogin
      isError={isErrorQueryLogin}
      isPending={isPendingQueryLogin}
      isSuccess={dataQueryLogin?.code === 'OK'}
      onSubmit={handleOnSubmitLogin}
      errorMsg={errorQueryLogin?.message}
      successMsg={dataQueryLogin?.message}
      onNavigate={navigate}
      linkMainPage={{
        link: '/',
        text: import.meta.env.VITE_ANALYTICS_APP_NAME,
      }}
      linkSignUp={{
        link: '/auth/sign-up',
        text: 'Sign up',
      }}
      linkForgotPassword={{
        link: '/auth/forgot-password',
        text: 'Forgot password?',
      }}
    />
  );
};
