import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { useMutation } from '@tanstack/react-query';
import { type FormType } from 'najwer23morsels/lib/Form';
import { FormSignUp } from 'najwer23morsels/lib/FormSignUp';
import { useNavigate } from 'react-router-dom';
import { querySignUp } from './SignUp.query';

export const SignUp = () => {
  const navigate = useNavigate();

  useDocumentTitle(`Sign Up | ${import.meta.env.VITE_ANALYTICS_APP_NAME}`);

  const { mutate, isPending, isError, data, error } = useMutation({
    mutationKey: ['queryLogin', 'queryLogin'],
    mutationFn: querySignUp,
  });

  const handleOnSubmit = (form: FormType) => {
    if (Object.values(form).some(({ error }) => error)) return;
    mutate(Object.fromEntries(Object.entries(form).map(([key, { value }]) => [key, value])));
  };

  return (
    <FormSignUp
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
        text: 'login',
      }}
    />
  );
};
