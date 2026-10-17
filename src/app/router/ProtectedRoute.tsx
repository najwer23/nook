import { useAuthStore } from '@app/auth/Auth.store';
import { useImmediateThrottledQuery } from '@app/hooks/useImmediateThrottledQuery';
import { storageItemRemove } from '@app/storage/storageItemRemove';
import { Grid } from 'najwer23morsels/lib/Grid';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { queryCheckAccess } from './ProtectedRoute.query';

interface Props {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
  const location = useLocation();
  const isAuth = useAuthStore.use.isAuth();
  const setAuth = useAuthStore.use.setAuth();

  const {
    result: resultQueryCheckAccess,
    isLoading: isLoadingQueryCheckAccess,
    isError: isErrorQueryCheckAccess,
  } = useImmediateThrottledQuery(
    {
      queryKey: ['queryCheckAccess', 'queryCheckAccess'],
      queryFn: queryCheckAccess,
      staleTime: 0,
      gcTime: 0,
      retry: 0,
      enabled: true,
    },
    0,
  );

  useEffect(() => {
    if (resultQueryCheckAccess?.code === 'OK') {
      setAuth(true);
    }
    if (isErrorQueryCheckAccess) {
      setAuth(false);
      storageItemRemove(sessionStorage, 'tokenJWTaccess');
    }
  }, [isLoadingQueryCheckAccess, isErrorQueryCheckAccess]);

  // only for log in
  if (isAuth) return children;

  // when press refresh f5
  if (isLoadingQueryCheckAccess) {
    return (
      <Grid widthMax={1400} layout="container" padding="10px 10px 10px 10px" margin="auto">
        <TextBox tag="h2" mobileSize={20} desktopSize={20}>
          Sync..
        </TextBox>
      </Grid>
    );
  }

  // when press refresh f5
  if (!isLoadingQueryCheckAccess) {
    return resultQueryCheckAccess?.code === 'OK' ? (
      children
    ) : (
      <Navigate to="/auth/login" state={{ from: location }} replace />
    );
  }
};
