import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { useMutation } from '@tanstack/react-query';
import { type FormType } from 'najwer23morsels/lib/Form';
import { FormForgotPassOtp } from 'najwer23morsels/lib/FormForgotPassOtp';
import { useNavigate, useParams } from 'react-router-dom';
import { queryForgotPasswordOtp } from './ForgotPasswordOtp.query';

export const ForgotPasswordOtp = () => {
  const { otp } = useParams<{ otp: string }>();

  useDocumentTitle(`Forgot Password Opt | ${import.meta.env.VITE_ANALYTICS_APP_NAME}`);
  const navigate = useNavigate();

  const { mutate, isPending, isError, data, error } = useMutation({
    mutationKey: ['queryLogin', 'queryLogin'],
    mutationFn: queryForgotPasswordOtp,
  });

  const handleOnSubmit = (form: FormType) => {
    if (!otp) return;
    if (Object.values(form).some(({ error }) => error)) return;
    const dataForm = Object.fromEntries(Object.entries(form).map(([key, { value }]) => [key, value]));

    mutate({
      ...dataForm,
      otp: otp,
    });
  };

  return (
    <FormForgotPassOtp
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
    />
  );
};
