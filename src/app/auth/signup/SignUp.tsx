import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { useMutation } from '@tanstack/react-query';
import { type FormType } from 'najwer23morsels/lib/Form';
import { FormSignUp } from 'najwer23morsels/lib/FormSignUp';
import { useNavigate } from 'react-router-dom';
import { querySignUp } from './SignUp.query';

export const SignUp = () => {
  const navigate = useNavigate();

  useDocumentTitle(`Sign Up | ${import.meta.env.VITE_ANALYTICS_APP_NAME}`);

  const {
    mutate: mutateQuerySignUp,
    isPending: isPendingQuerySignUp,
    isError: isErrorQuerySignUp,
    data: dataQuerySignUp,
    error: errorQuerySignUp,
  } = useMutation({
    mutationKey: ['querySignUp', 'querySignUp'],
    mutationFn: querySignUp,
  });

  const handleOnSubmitSignUp = (form: FormType) => {
    if (Object.values(form).some(({ error }) => error)) return;

    const dataForm = Object.fromEntries(Object.entries(form).map(([key, { value }]) => [key, value]));

    mutateQuerySignUp(dataForm);
  };

  return (
    <FormSignUp
      isError={isErrorQuerySignUp}
      isPending={isPendingQuerySignUp}
      isSuccess={dataQuerySignUp?.code === 'OK'}
      onSubmit={handleOnSubmitSignUp}
      errorMsg={errorQuerySignUp?.message}
      successMsg={dataQuerySignUp?.message}
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
