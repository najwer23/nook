import { Grid } from 'najwer23morsels/lib/Grid';
import { LoaderDots } from 'najwer23morsels/lib/LoaderDots';
import { TextBox } from 'najwer23morsels/lib/TextBox';

export const PaymentsBalanceLoader: React.FC<{
  isRefreshing: boolean;
  name: string;
  value: string;
}> = ({ isRefreshing, name, value }) => (
  <Grid layout="container" widthMax="900px" margin="0">
    <Grid layout="flex" justifyContent="flex-start">
      <div>
        <TextBox tag="p" desktopSize={18} mobileSize={18} fontWeight={500}>
          {name}:&nbsp;
        </TextBox>
      </div>
      <div>
        {isRefreshing && <LoaderDots mobileSize={18} desktopSize={18} />}
        {!isRefreshing && (
          <TextBox tag="p" desktopSize={18} mobileSize={18} fontWeight={500}>
            <b>{value}</b>
          </TextBox>
        )}
      </div>
    </Grid>
  </Grid>
);
