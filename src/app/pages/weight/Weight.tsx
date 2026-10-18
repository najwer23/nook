import { ChartLine } from '@app/charts/ChartLine';
import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { useImmediateThrottledQuery } from '@app/hooks/useImmediateThrottledQuery';
import { Form, type FormType } from 'najwer23morsels/lib/Form';
import { Grid } from 'najwer23morsels/lib/Grid';
import { Loader } from 'najwer23morsels/lib/Loader';
import { Select } from 'najwer23morsels/lib/Select';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { Typography } from 'najwer23morsels/lib/Typography';
import { useState } from 'react';
import { chartDataBMI } from './chartData/chartDataBMI';
import { chartDataWeight } from './chartData/chartDataWeight';
import { queryDashboardWeight } from './Weight.query';

// import styles from './Home.module.css';

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

  return (
    <Grid layout="container" widthMax={'100%'} padding="0">
      <Grid layout="container" widthMax="900px" margin="0 0 40px 0">
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
          <div>
            <Select
              label={'Year'}
              validatorOptions={[{ type: 'empty' }]}
              name="year"
              options={Array.from({ length: Math.max(0, Number(currentYear) - START_YEAR + 1) }, (_, i) => {
                const year = START_YEAR + i;
                return {
                  value: year.toString(),
                  label: year.toString(),
                };
              })}
              initialValue={{ value: currentYear, label: currentYear }}
              onBlur={(_, data) => setYear(data.value)}
            />
          </div>
        </Grid>
      </Form>

      <Grid layout="container" widthMax={'1400px'} padding={'30px 0 0 0'}>
        {isLoadingQueryDashboardWeight && (
          <>
            <Grid layout="container" widthMax={'1400px'} padding={'30px 0px 60px 0px'}>
              <Loader minHeight="700px" />
            </Grid>
            <Grid layout="container" widthMax={'1400px'} padding={'30px 0px 60px 0px'}>
              <Loader minHeight="700px" />
            </Grid>
          </>
        )}
        {!isLoadingQueryDashboardWeight && (
          <>
            {isErrorQueryDashboardWeight && (
              <TextBox tag="p" desktopSize={16} mobileSize={16} fontWeight={500}>
                No results
              </TextBox>
            )}
            <div>
              {resultQueryDashboardWeight?.data?.weights && (
                <>
                  <div
                    style={{
                      marginTop: '30px',
                      marginBottom: '60px',
                      height: '700px',
                    }}
                  >
                    <ChartLine
                      title={'Weight'}
                      data={chartDataWeight(resultQueryDashboardWeight.data.weights, 'Weight')}
                      ySymbol={' kg'}
                    />
                  </div>
                </>
              )}
            </div>
            <div>
              {resultQueryDashboardWeight?.data?.weights && (
                <>
                  <div
                    style={{
                      marginTop: '30px',
                      marginBottom: '60px',
                      height: '700px',
                    }}
                  >
                    <ChartLine
                      title={'BMI'}
                      data={chartDataBMI(resultQueryDashboardWeight.data.weights, 'BMI')}
                      ySymbol={' kg/m²'}
                    />
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </Grid>
    </Grid>
  );
};
