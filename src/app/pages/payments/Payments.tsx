import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { useImmediateThrottledQuery } from '@app/hooks/useImmediateThrottledQuery';
import { keepPreviousData } from '@tanstack/react-query';
import { Grid } from 'najwer23morsels/lib/Grid';
import { LoaderDots } from 'najwer23morsels/lib/LoaderDots';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { Typography } from 'najwer23morsels/lib/Typography';
import { useState } from 'react';
import { BALANCE_REFRESH_IDLE } from './Payments.const';
import { queryBalanceGet, queryPaymentsTable } from './Payments.query';
import type { BalanceRefreshFlags } from './Payments.types';
import { replaceStringVariables } from './Payments.utils';
import { PaymentsBalanceAddDialog } from './PaymentsBalanceAddDialog';
import { PaymentsBalanceLoader } from './PaymentsBalanceLoader';
import { PaymentsInvoiceAddDialog } from './PaymentsInvoiceAddDialog';
import { PaymentsTable } from './PaymentsTable';
import { PaymentsTransferTitle } from './PaymentsTransferTitle';

export const Payments: React.FC<{
  type: string;
  title: string;
}> = ({ type, title }) => {
  useDocumentTitle(`${title} | ${import.meta.env.VITE_ANALYTICS_APP_NAME}`);

  const [balanceRefresh, setBalanceRefresh] = useState<BalanceRefreshFlags>(BALANCE_REFRESH_IDLE);

  const {
    result: resultQueryPaymentsTable,
    isLoading: isLoadingQueryPaymentsTable,
    isError: isErrorQueryPaymentsTable,
  } = useImmediateThrottledQuery(
    {
      queryKey: ['queryPaymentsTable', 'queryPaymentsTable' + type],
      queryFn: () => queryPaymentsTable({ type }),
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
      queryKey: ['queryBalanceGet', 'queryBalanceGet' + type],
      queryFn: () => queryBalanceGet({ type }),
      placeholderData: keepPreviousData,
      staleTime: 0,
      gcTime: 0,
      retry: 0,
      enabled: true,
    },
    500,
  );

  const hasResultQueryPaymentsTable = Boolean(resultQueryPaymentsTable?.data);
  const hasResultQueryBalanceGet = Boolean(resultQueryBalanceGet?.data);

  const isInitialLoading =
    (isLoadingQueryPaymentsTable && !hasResultQueryPaymentsTable) ||
    (isLoadingQueryBalanceGet && !hasResultQueryBalanceGet);

  const cols = resultQueryPaymentsTable?.data?.cols ?? [];
  const rows = resultQueryPaymentsTable?.data?.rows ?? [];

  const credits = resultQueryBalanceGet?.data?.credits;
  const bankAccountNumber = resultQueryBalanceGet?.data?.bankAccountNumber ?? '';

  const templateParams = resultQueryBalanceGet?.data?.templateParams;
  const templateText = resultQueryBalanceGet?.data?.templateText ?? '';

  const generatedText = replaceStringVariables(type, templateText, {
    ...rows[0],
    ...templateParams,
  });

  return (
    <Grid layout="container" widthMax={'100%'} padding="0">
      <Grid layout="container" widthMax="900px" margin="0 0 30px 0">
        <Typography variant="display" style={{ margin: 0 }}>
          {title}
        </Typography>
      </Grid>

      {isInitialLoading && <LoaderDots />}

      {!isInitialLoading && (
        <>
          <Grid
            layout="flex"
            justifyContent="flex-start"
            flexWrap="wrap"
            gap={{ col: '15px', row: '15px' }}
            margin="0 0 30px"
          >
            <PaymentsBalanceAddDialog type={type} onRefreshChange={setBalanceRefresh} />
          </Grid>

          <PaymentsBalanceLoader isRefreshing={balanceRefresh.credits}>
            Balance:{' '}
            <b>{new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(credits ?? 0)}</b>
          </PaymentsBalanceLoader>

          <PaymentsBalanceLoader isRefreshing={balanceRefresh.bankAccountNumber}>
            Bank account number: <b>{bankAccountNumber || 'unknown'}</b>
          </PaymentsBalanceLoader>

          {type == 'Orange' && (
            <PaymentsBalanceLoader isRefreshing={balanceRefresh.clientId}>
              ClientId: <b>{templateParams?.clientId || 'unknown'}</b>
            </PaymentsBalanceLoader>
          )}

          <PaymentsTransferTitle key={generatedText} generatedText={generatedText} />

          {isErrorQueryPaymentsTable && (
            <TextBox tag="p" desktopSize={16} mobileSize={16} fontWeight={500}>
              No results
            </TextBox>
          )}

          {hasResultQueryPaymentsTable && (
            <Grid layout="container" widthMax={'100%'}>
              <Grid layout="container" margin={'0px 0 10px'}>
                <div>
                  <PaymentsInvoiceAddDialog cols={cols} type={type} onRefreshChange={setBalanceRefresh} />
                </div>
              </Grid>

              <PaymentsTable
                cols={cols}
                rows={rows}
                isLoading={isLoadingQueryPaymentsTable}
                type={type}
                onRefreshChange={setBalanceRefresh}
              />
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
};
