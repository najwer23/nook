import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { useMutation } from '@tanstack/react-query';
import { type FormType } from 'najwer23morsels/lib/Form';
import { FormForgotPass } from 'najwer23morsels/lib/FormForgotPass';
import { useNavigate } from 'react-router-dom';
import { queryForgotPassword } from './ForgotPassword.query';

export const ForgotPassword = () => {
  useDocumentTitle(`Forgot Password | ${import.meta.env.VITE_ANALYTICS_APP_NAME}`);
  const navigate = useNavigate();

  const { mutate, isPending, isError, data, error } = useMutation({
    mutationKey: ['queryForgotPassword', 'queryForgotPassword'],
    mutationFn: queryForgotPassword,
  });

  const handleOnSubmit = (form: FormType) => {
    if (Object.values(form).some(({ error }) => error)) return;
    const dataForm = Object.fromEntries(Object.entries(form).map(([key, { value }]) => [key, value]));

    mutate({
      ...dataForm,
      appName: import.meta.env.VITE_ANALYTICS_APP_NAME,
    });
  };

  return (
    <FormForgotPass
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
      linkLogin={{
        link: '/auth/login',
        text: 'Login',
      }}
    />
  );
};
