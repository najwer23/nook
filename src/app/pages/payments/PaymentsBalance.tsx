import { Grid } from 'najwer23morsels/lib/Grid';
import { LoaderDots } from 'najwer23morsels/lib/LoaderDots';
import { TextBox } from 'najwer23morsels/lib/TextBox';

export const PaymentsBalance: React.FC<{
  credits?: number;
  isLoading: boolean;
  bankAccountNumber: string;
}> = ({ credits, isLoading, bankAccountNumber }) => {
  return (
    <Grid layout="container" widthMax="900px" margin="0 0 30px 0">
      {isLoading && (
        <>
          <LoaderDots mobileSize={18} desktopSize={18} />
          <LoaderDots mobileSize={18} desktopSize={18} />
        </>
      )}
      {!isLoading && (
        <>
          <TextBox tag="p" desktopSize={18} mobileSize={18} fontWeight={500}>
            Bank account number: <b>{bankAccountNumber || 'unknown'}</b>
          </TextBox>
          <TextBox tag="p" desktopSize={18} mobileSize={18} fontWeight={500}>
            Balance:{' '}
            <b>{new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(credits ?? 0)}</b>
          </TextBox>
        </>
      )}
    </Grid>
  );
};
