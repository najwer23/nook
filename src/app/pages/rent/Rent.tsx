import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { Grid } from 'najwer23morsels/lib/Grid';
import { Typography } from 'najwer23morsels/lib/Typography';

// import styles from './Rent.module.css';

interface Props {}

export const Rent: React.FC<Props> = ({}) => {
  useDocumentTitle(`Rent | ${import.meta.env.VITE_ANALYTICS_APP_NAME}`);

  return (
    <Grid layout="container" widthMax={'100%'} padding="0">
      <Grid layout="container" widthMax="900px" margin="0 0 30px 0">
        <Typography appearance="light" variant="display" style={{ margin: 0 }}>
          Rent
        </Typography>
      </Grid>
    </Grid>
  );
};
