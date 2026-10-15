import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { Grid } from 'najwer23morsels/lib/Grid';
import { TextBox } from 'najwer23morsels/lib/TextBox';
// import styles from './Home.module.css';

export const Home = () => {
  useDocumentTitle('Home | Mariusz Najwer');

  return (
    <Grid layout="container" padding={'0 0 40px 0'} margin={0}>
      <TextBox tag="h2" desktopSize={30} mobileSize={24} fontWeight={500}>
        Hello World!
      </TextBox>
    </Grid>
  );
};
