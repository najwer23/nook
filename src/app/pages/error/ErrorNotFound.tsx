import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { Grid } from 'najwer23morsels/lib/Grid';
import { Typography } from 'najwer23morsels/lib/Typography';

export const ErrorNotFound = () => {
  useDocumentTitle(`Error | ${import.meta.env.VITE_ANALYTICS_APP_NAME}`);

  return (
    <Grid layout="container" widthMax="900px" margin={'0 0 30px 0'}>
      <Typography appearance="light" variant="display" style={{ margin: 0 }}>
        404 Not Found
      </Typography>
    </Grid>
  );
};
