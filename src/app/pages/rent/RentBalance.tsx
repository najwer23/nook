import { Grid } from 'najwer23morsels/lib/Grid';
import { TextBox } from 'najwer23morsels/lib/TextBox';

export const RentBalance: React.FC<{
  credits?: number;
}> = ({ credits }) => {
  return (
    <Grid layout="container" widthMax="900px" margin="0 0 30px 0">
      <TextBox tag="p" desktopSize={18} mobileSize={18} fontWeight={500}>
        Balance: {new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(credits ?? 0)}
      </TextBox>
    </Grid>
  );
};
