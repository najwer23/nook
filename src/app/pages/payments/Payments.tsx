import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { useImmediateThrottledQuery } from '@app/hooks/useImmediateThrottledQuery';
import { keepPreviousData } from '@tanstack/react-query';
import { Form, type FormType } from 'najwer23morsels/lib/Form';
import { Grid } from 'najwer23morsels/lib/Grid';
import { LoaderDots } from 'najwer23morsels/lib/LoaderDots';
import { Select } from 'najwer23morsels/lib/Select';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { Typography } from 'najwer23morsels/lib/Typography';
import { useState } from 'react';
import { queryBalanceGet, queryPaymentsTable } from './Payments.query';
import { replaceStringVariables } from './Payments.utils';
import { PaymentsBalanceAddDialog } from './PaymentsBalanceAddDialog';
import { PaymentsBalanceLoader } from './PaymentsBalanceLoader';
import { PaymentsInvoiceAddDialog } from './PaymentsInvoiceAddDialog';
import { PaymentsTable } from './PaymentsTable';
import { PaymentsTransferTitle } from './PaymentsTransferTitle';

const START_YEAR = 2026;

export const Payments: React.FC<{
  type: string;
  title: string;
}> = ({ type, title }) => {
  useDocumentTitle(`${title} | ${import.meta.env.VITE_ANALYTICS_APP_NAME}`);

  const currentYear = String(new Date().getFullYear());
  const [year, setYear] = useState(currentYear);

  const {
    result: resultQueryPaymentsTable,
    isLoading: isLoadingQueryPaymentsTable,
    isError: isErrorQueryPaymentsTable,
  } = useImmediateThrottledQuery(
    {
      queryKey: ['queryPaymentsTable', 'queryPaymentsTable' + type + year],
      queryFn: () => queryPaymentsTable({ type, year }),
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

  const handleOnSubmitSelectYear = (form: FormType) => {
    if (Object.values(form).some(({ error }) => error)) return;
    const dataForm = Object.fromEntries(Object.entries(form).map(([key, { value }]) => [key, value]));
    setYear(dataForm.year);
  };

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
            <PaymentsBalanceAddDialog type={type} />
          </Grid>

          <PaymentsBalanceLoader
            isRefreshing={isLoadingQueryBalanceGet}
            name="Balance"
            value={new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(credits ?? 0)}
          />

          <PaymentsBalanceLoader
            isRefreshing={isLoadingQueryBalanceGet}
            name="Bank account number"
            value={bankAccountNumber || 'unknown'}
          />

          {type == 'Orange' && (
            <PaymentsBalanceLoader
              isRefreshing={isLoadingQueryBalanceGet}
              name="Client Id"
              value={templateParams?.clientId || 'unknown'}
            />
          )}

          <Form
            onSubmit={handleOnSubmitSelectYear}
            isError={false}
            isPending={false}
            isSuccess={false}
            errorMsg={undefined}
            successMsg={undefined}
          >
            <Grid layout="container" widthMax="500px" margin="30px 0 30px 0">
              <Select
                label={'Year'}
                validatorOptions={[{ type: 'empty' }]}
                name="year"
                options={Array.from({ length: Math.max(0, Number(currentYear) - START_YEAR + 1) }, (_, i) => {
                  const y = START_YEAR + i;
                  return {
                    value: y.toString(),
                    label: y.toString(),
                  };
                })}
                initialValue={{ value: year, label: year }}
                onBlur={(_, data) => setYear(data.value)}
              />
            </Grid>

            <PaymentsTransferTitle
              key={generatedText}
              generatedText={isLoadingQueryBalanceGet || isLoadingQueryPaymentsTable ? '' : generatedText}
            />
          </Form>

          {isErrorQueryPaymentsTable && (
            <TextBox tag="p" desktopSize={16} mobileSize={16} fontWeight={500}>
              No results
            </TextBox>
          )}

          {hasResultQueryPaymentsTable && (
            <Grid layout="container" widthMax={'100%'}>
              <Grid layout="container" margin={'0px 0 10px'}>
                <div>
                  <PaymentsInvoiceAddDialog cols={cols} type={type} />
                </div>
              </Grid>

              <PaymentsTable cols={cols} rows={rows} isLoading={isLoadingQueryPaymentsTable} type={type} />
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
};
