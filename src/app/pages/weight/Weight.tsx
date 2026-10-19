import { ChartLine } from '@app/charts/ChartLine';
import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { useImmediateThrottledQuery } from '@app/hooks/useImmediateThrottledQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from 'najwer23morsels/lib/Button';
import { Dialog } from 'najwer23morsels/lib/Dialog';
import { Form, type FormType } from 'najwer23morsels/lib/Form';
import { Grid } from 'najwer23morsels/lib/Grid';
import { Input } from 'najwer23morsels/lib/Input';
import { LoaderDots } from 'najwer23morsels/lib/LoaderDots';
import { Select } from 'najwer23morsels/lib/Select';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { Typography } from 'najwer23morsels/lib/Typography';
import { useState } from 'react';
import { chartDataBMI } from './chartData/chartDataBMI';
import { chartDataWeight } from './chartData/chartDataWeight';
import { queryWeightCreate, queryWeightGetStats } from './Weight.query';

const START_YEAR = 2026;

export const Weight = () => {
  useDocumentTitle(`Weight | ${import.meta.env.VITE_ANALYTICS_APP_NAME}`);

  const queryClient = useQueryClient();

  const currentYear = String(new Date().getFullYear());
  const [year, setYear] = useState(currentYear);
  const [isOpenDialogAddWeight, openDialogAddWeight] = useState(false);
  const [weightFormKey, setWeightFormKey] = useState(0);

  const handleOnSubmitSelectYear = (form: FormType) => {
    if (Object.values(form).some(({ error }) => error)) return;
    const dataForm = Object.fromEntries(Object.entries(form).map(([key, { value }]) => [key, value]));
    setYear(dataForm.year);
  };

  const {
    mutate: mutateQueryWeightCreate,
    isPending: isPendingQueryWeightCreate,
    isError: isErrorQueryWeightCreate,
    data: dataQueryWeightCreate,
    error: errorQueryWeightCreate,
    reset: resetQueryWeightCreate,
  } = useMutation({
    mutationKey: ['queryWeightCreate', 'queryWeightCreate'],
    mutationFn: queryWeightCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['queryWeightGetStats'],
      });

      setWeightFormKey((prev) => prev + 1);
    },
  });

  const handleOnSubmitWeightCreate = (form: FormType) => {
    if (Object.values(form).some(({ error }) => error)) return;
    const dataForm = Object.fromEntries(Object.entries(form).map(([key, { value }]) => [key, value]));

    mutateQueryWeightCreate({
      ...dataForm,
    });
  };

  const {
    result: resultQueryWeightGetStats,
    isLoading: isLoadingQueryWeightGetStats,
    isError: isErrorQueryWeightGetStats,
  } = useImmediateThrottledQuery(
    {
      queryKey: ['queryWeightGetStats', 'queryWeightGetStats' + year],
      queryFn: () => queryWeightGetStats(year),
      staleTime: 0,
      gcTime: 0,
      retry: 0,
      enabled: true,
    },
    500,
  );

  const weights = resultQueryWeightGetStats?.data?.weights;

  return (
    <Grid layout="container" widthMax={'100%'} padding="0">
      <Grid layout="container" widthMax={'100%'} margin={'0 0 30px 0'}>
        <Typography appearance="light" variant="display" style={{ margin: 0 }}>
          Weight
        </Typography>
      </Grid>

      <Grid layout="container" widthMax={'100%'} margin={'0 0 30px 0'}>
        <Grid
          layout="flex"
          justifyContent="flex-start"
          flexWrap="wrap"
          gap={{ col: '20px', row: '20px' }}
          margin={'20px 0 0'}
        >
          <Button height="40px" width="120px" backgroundColor="orangered" onClick={() => openDialogAddWeight(true)}>
            <TextBox mobileSize={18} desktopSize={18} color="white">
              Add Weight
            </TextBox>
          </Button>

          <Dialog
            widthMax={'900px'}
            open={isOpenDialogAddWeight}
            onCancel={() => {
              openDialogAddWeight(false);
              resetQueryWeightCreate();
            }}
          >
            <Grid
              layout="container"
              widthMin={'min(400px, calc(100vw - 25px))'}
              padding="0px 30px 30px 30px"
              margin="auto"
            >
              <Typography appearance="light" variant="subheading" style={{ margin: '0 0 20px 0' }}>
                Add Weight
              </Typography>

              <Form
                key={weightFormKey}
                onSubmit={handleOnSubmitWeightCreate}
                isError={isErrorQueryWeightCreate}
                isPending={isPendingQueryWeightCreate}
                isSuccess={dataQueryWeightCreate?.code === 'OK'}
                errorMsg={errorQueryWeightCreate?.message}
                successMsg={dataQueryWeightCreate?.message}
              >
                <Grid
                  widthMax={1400}
                  layout="columns"
                  col={{ mobile: 1, smallDesktop: 1, desktop: 1, tablet: 1 }}
                  gap={{ col: '30px', row: '30px' }}
                  padding="0"
                  margin="0"
                >
                  <div>
                    <Input
                      label="Weight"
                      placeholder="Weight (kg)"
                      type="number"
                      name="weight"
                      step={0.01}
                      validatorOptions={[
                        { type: 'empty' },
                        { type: 'numberInRange', options: { min: 1, max: 1000 } },
                        { type: 'decimalDigits', options: { digits: 2 } },
                      ]}
                    />

                    <Grid
                      layout="flex"
                      widthMax={'100%'}
                      padding={'0'}
                      justifyContent="flex-end"
                      alignItems="right"
                      margin={'20px 0 0 0'}
                    >
                      <Button
                        type="submit"
                        height={'40px'}
                        width={'80px'}
                        padding={0}
                        disabled={isPendingQueryWeightCreate}
                        backgroundColor="#4BB543"
                        backgroundColorDisabled="grey"
                      >
                        <TextBox tag="span" desktopSize={16} mobileSize={16} fontWeight={400} color="white">
                          Save
                        </TextBox>
                      </Button>
                    </Grid>
                  </div>
                </Grid>
              </Form>
            </Grid>
          </Dialog>
        </Grid>
      </Grid>

      <Form
        onSubmit={handleOnSubmitSelectYear}
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

      {isLoadingQueryWeightGetStats && <LoaderDots />}

      {!isLoadingQueryWeightGetStats && isErrorQueryWeightGetStats && (
        <TextBox tag="p" desktopSize={16} mobileSize={16} fontWeight={500}>
          No results
        </TextBox>
      )}

      <Grid layout="container" widthMax={'100%'}>
        {!isLoadingQueryWeightGetStats && weights && (
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
