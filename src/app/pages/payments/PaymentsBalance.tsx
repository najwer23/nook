import { Grid } from 'najwer23morsels/lib/Grid';
import { LoaderDots } from 'najwer23morsels/lib/LoaderDots';
import { TextBox } from 'najwer23morsels/lib/TextBox';

export const PaymentsBalance: React.FC<{
  credits?: number;
  isLoading: boolean;
}> = ({ credits, isLoading }) => {
  return (
    <Grid layout="container" widthMax="900px" margin="0 0 30px 0">
      {isLoading && <LoaderDots mobileSize={18} desktopSize={18} />}
      {!isLoading && (
        <TextBox tag="p" desktopSize={18} mobileSize={18} fontWeight={500}>
          Balance: {new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(credits ?? 0)}
        </TextBox>
      )}
    </Grid>
  );
};
