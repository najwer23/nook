import { Grid } from 'najwer23morsels/lib/Grid';
import { TextBox } from 'najwer23morsels/lib/TextBox';

interface Props {
  credits?: number;
}

const currencyFormatter = new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' });

export const RentBalance: React.FC<Props> = ({ credits }) => {
  return (
    <Grid layout="container" widthMax="900px" margin="0 0 30px 0">
      <TextBox tag="p" desktopSize={18} mobileSize={18} fontWeight={500}>
        Balance: {credits === undefined ? '-' : currencyFormatter.format(credits)}
      </TextBox>
    </Grid>
  );
};
