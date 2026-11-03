import { Grid } from 'najwer23morsels/lib/Grid';
import { LoaderDots } from 'najwer23morsels/lib/LoaderDots';
import { TextBox } from 'najwer23morsels/lib/TextBox';

export const PaymentsBalanceLoader: React.FC<{
  isRefreshing: boolean;
  children: React.ReactNode;
}> = ({ isRefreshing, children }) => (
  <Grid layout="container" widthMax="900px" margin="0">
    {isRefreshing && <LoaderDots mobileSize={18} desktopSize={18} />}
    {!isRefreshing && (
      <TextBox tag="p" desktopSize={18} mobileSize={18} fontWeight={500}>
        {children}
      </TextBox>
    )}
  </Grid>
);
