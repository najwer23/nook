import { ChartLine } from '@app/charts/ChartLine';
import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { useImmediateThrottledQuery } from '@app/hooks/useImmediateThrottledQuery';
import { Form, type FormType } from 'najwer23morsels/lib/Form';
import { Grid } from 'najwer23morsels/lib/Grid';
import { LoaderDots } from 'najwer23morsels/lib/LoaderDots';
import { Select } from 'najwer23morsels/lib/Select';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { Typography } from 'najwer23morsels/lib/Typography';
import { useState } from 'react';
import { chartDataBMI } from './chartData/chartDataBMI';
import { chartDataWeight } from './chartData/chartDataWeight';
import { queryDashboardWeight } from './Weight.query';

const START_YEAR = 2026;

export const Weight = () => {
  useDocumentTitle(`Weight | ${import.meta.env.VITE_ANALYTICS_APP_NAME}`);

  const currentYear = String(new Date().getFullYear());
  const [year, setYear] = useState(currentYear);

  const handleOnSubmit = (form: FormType) => {
    if (Object.values(form).some(({ error }) => error)) return;
    const dataForm = Object.fromEntries(Object.entries(form).map(([key, { value }]) => [key, value]));
    setYear(dataForm.year);
  };

  const {
    result: resultQueryDashboardWeight,
    isLoading: isLoadingQueryDashboardWeight,
    isError: isErrorQueryDashboardWeight,
  } = useImmediateThrottledQuery(
    {
      queryKey: ['queryDashboardWeight', 'queryDashboardWeight' + year],
      queryFn: () => queryDashboardWeight(year),
      staleTime: 0,
      gcTime: 0,
      retry: 0,
      enabled: true,
    },
    500,
  );

  const weights = resultQueryDashboardWeight?.data?.weights;

  return (
    <Grid layout="container" widthMax={'100%'} padding="0">
      <Grid layout="container" widthMax={'100%'} margin={'0 0 30px 0'}>
        <Typography appearance="light" variant="display" style={{ margin: 0 }}>
          Weight
        </Typography>
      </Grid>

      <Form
        onSubmit={handleOnSubmit}
        isError={false}
        isPending={false}
        isSuccess={false}
        errorMsg={undefined}
        successMsg={undefined}
      >
        <Grid
          layout="columns"
          col={{ mobile: 1, smallDesktop: 2, desktop: 2, tablet: 2 }}
          gap={{ col: '30px', row: '30px' }}
          padding="0"
          margin="0"
        >
          <Grid layout="container" widthMax={'100%'} margin={'0 0 30px'}>
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
        </Grid>
      </Form>

      {isLoadingQueryDashboardWeight && <LoaderDots />}

      {!isLoadingQueryDashboardWeight && isErrorQueryDashboardWeight && (
        <TextBox tag="p" desktopSize={16} mobileSize={16} fontWeight={500}>
          No results
        </TextBox>
      )}

      <Grid layout="container" widthMax={'100%'}>
        {!isLoadingQueryDashboardWeight && weights && (
          <>
            <Grid layout="container" widthMax={'100%'} padding={'0px 0px 30px 0px'} minHeight={'700px'}>
              <ChartLine title={'Weight'} data={chartDataWeight(weights, 'Weight')} ySymbol={' kg'} />
            </Grid>
            <Grid layout="container" widthMax={'100%'} padding={'0px 0px 30px 0px'} minHeight={'700px'}>
              <ChartLine title={'BMI'} data={chartDataBMI(weights, 'BMI')} ySymbol={' kg/m²'} />
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
};
