import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { useMutation } from '@tanstack/react-query';
import { type FormType } from 'najwer23morsels/lib/Form';
import { FormForgotPassOtp } from 'najwer23morsels/lib/FormForgotPassOtp';
import { useNavigate, useParams } from 'react-router-dom';
import { queryForgotPasswordOtp } from './ForgotPasswordOtp.query';

export const ForgotPasswordOtp = () => {
  const { otp } = useParams<{ otp: string }>();

  useDocumentTitle(`Forgot Password OTP | ${import.meta.env.VITE_ANALYTICS_APP_NAME}`);

  const navigate = useNavigate();

  const {
    mutate: mutateQueryForgotPasswordOtp,
    isPending: isPendingQueryForgotPasswordOtp,
    isError: isErrorQueryForgotPasswordOtp,
    data: dataQueryForgotPasswordOtp,
    error: errorQueryForgotPasswordOtp,
  } = useMutation({
    mutationKey: ['queryForgotPasswordOtp', 'queryForgotPasswordOtp'],
    mutationFn: queryForgotPasswordOtp,
  });

  const handleOnSubmitForgotPasswordOtp = (form: FormType) => {
    if (!otp) return;
    if (Object.values(form).some(({ error }) => error)) return;

    const dataForm = Object.fromEntries(Object.entries(form).map(([key, { value }]) => [key, value]));

    mutateQueryForgotPasswordOtp({
      ...dataForm,
      otp,
    });
  };

  return (
    <FormForgotPassOtp
      isError={isErrorQueryForgotPasswordOtp}
      isPending={isPendingQueryForgotPasswordOtp}
      isSuccess={dataQueryForgotPasswordOtp?.code === 'OK'}
      onSubmit={handleOnSubmitForgotPasswordOtp}
      errorMsg={errorQueryForgotPasswordOtp?.message}
      successMsg={dataQueryForgotPasswordOtp?.message}
      onNavigate={navigate}
      linkMainPage={{
        link: '/',
        text: import.meta.env.VITE_ANALYTICS_APP_NAME,
      }}
    />
  );
};
