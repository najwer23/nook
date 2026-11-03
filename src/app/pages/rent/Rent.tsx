import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { useImmediateThrottledQuery } from '@app/hooks/useImmediateThrottledQuery';
import { keepPreviousData } from '@tanstack/react-query';
import { Grid } from 'najwer23morsels/lib/Grid';
import { LoaderDots } from 'najwer23morsels/lib/LoaderDots';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { Typography } from 'najwer23morsels/lib/Typography';
import { queryBalanceGet, queryRentTable } from './Rent.query';
import { RentBalance } from './RentBalance';
import { RentInvoiceAddDialog } from './RentInvoiceAddDialog';
import { RentTable } from './RentTable';

interface Props {}

export const Rent: React.FC<Props> = ({}) => {
  useDocumentTitle(`Rent | ${import.meta.env.VITE_ANALYTICS_APP_NAME}`);

  const {
    result: resultQueryRentTable,
    isLoading: isLoadingQueryRentTable,
    isError: isErrorQueryRentTable,
  } = useImmediateThrottledQuery(
    {
      queryKey: ['queryRentTable', 'queryRentTable'],
      queryFn: () => queryRentTable(),
      placeholderData: keepPreviousData,
      staleTime: 0,
      gcTime: 0,
      retry: 0,
      enabled: true,
    },
    500,
  );

  const { result: resultQueryBalanceGet, isLoading: isLoadingQueryBalanceGet } = useImmediateThrottledQuery(
    {
      queryKey: ['queryBalanceGet', 'Rent'],
      queryFn: () => queryBalanceGet({ type: 'Rent' }),
      placeholderData: keepPreviousData,
      staleTime: 0,
      gcTime: 0,
      retry: 0,
      enabled: true,
    },
    500,
  );

  const hasResultQueryRentTable = Boolean(resultQueryRentTable?.data);
  const hasResultQueryBalanceGet = Boolean(resultQueryBalanceGet?.data);

  const isInitialLoading =
    (isLoadingQueryRentTable && !hasResultQueryRentTable) || (isLoadingQueryBalanceGet && !hasResultQueryBalanceGet);

  const cols = resultQueryRentTable?.data?.cols ?? [];
  const rows = resultQueryRentTable?.data?.rows ?? [];
  const credits = resultQueryBalanceGet?.data?.credits;

  return (
    <Grid layout="container" widthMax={'100%'} padding="0">
      <Grid layout="container" widthMax="900px" margin="0 0 30px 0">
        <Typography appearance="light" variant="display" style={{ margin: 0 }}>
          Rent
        </Typography>
      </Grid>

      {isInitialLoading && <LoaderDots />}

      {!isInitialLoading && (
        <>
          <RentBalance credits={credits} />

          {isErrorQueryRentTable && (
            <TextBox tag="p" desktopSize={16} mobileSize={16} fontWeight={500}>
              No results
            </TextBox>
          )}

          {hasResultQueryRentTable && (
            <Grid layout="container" widthMax={'100%'}>
              <Grid
                layout="flex"
                justifyContent="flex-start"
                flexWrap="wrap"
                gap={{ col: '20px', row: '20px' }}
                margin={'0px 0 20px'}
              >
                <RentInvoiceAddDialog cols={cols} />
              </Grid>

              <RentTable cols={cols} rows={rows} isLoading={isLoadingQueryRentTable} />
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
};
