import { useAuthStore } from '@app/auth/Auth.store';
import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { useMutation } from '@tanstack/react-query';
import { Grid } from 'najwer23morsels/lib/Grid';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { queryLogout } from './Logout.query';

export const Logout = () => {
  const setAuth = useAuthStore.use.setAuth();
  const navigate = useNavigate();

  useDocumentTitle(`Logout | ${import.meta.env.VITE_ANALYTICS_APP_NAME}`);

  const { mutate: mutateQueryLogout } = useMutation({
    mutationKey: ['queryLogout', 'queryLogout'],
    mutationFn: queryLogout,
    onSettled: () => {
      setAuth(false);
      navigate('/auth/login');
    },
  });

  useEffect(() => {
    mutateQueryLogout();
  }, []);

  return (
    <Grid widthMax={1400} layout="container" padding="10px" margin="auto">
      <TextBox tag="h2" mobileSize={20} desktopSize={20}>
        Logout..
      </TextBox>
    </Grid>
  );
};
