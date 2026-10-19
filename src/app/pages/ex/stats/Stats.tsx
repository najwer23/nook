import { ChartLine } from '@app/charts/ChartLine';
import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { useImmediateThrottledQueries } from '@app/hooks/useImmediateThrottledQueries';
import { Grid } from 'najwer23morsels/lib/Grid';
import { LoaderDots } from 'najwer23morsels/lib/LoaderDots';
import { Select } from 'najwer23morsels/lib/Select';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { useState } from 'react';
import { chartDataWorkout } from './chartData/chartDataWorkout';
import { queryStatsWorkout } from './Stats.query';

const START_YEAR = 2024;

export const Stats: React.FC<{
  workoutName: string;
}> = ({ workoutName }) => {
  useDocumentTitle('Dashboard | GYM');

  const currentYear = String(new Date().getFullYear());
  const [year, setYear] = useState(currentYear);

  const {
    resultsArray: resultsStatsWorkout,
    isLoading: isLoadingStatsWorkout,
    isError: isErrorArrayStatsWorkout,
  } = useImmediateThrottledQueries(
    [workoutName].map((ex) => ({
      queryKey: ['queryStatsWorkout', ex + year],
      queryFn: () => queryStatsWorkout(ex, year),
      staleTime: 0,
      gcTime: 0,
      retry: 0,
      enabled: true,
    })),
    500,
  );

  const isLoading = isLoadingStatsWorkout;
  const isError = isErrorArrayStatsWorkout;

  return (
    <Grid layout="container">
      <Grid
        layout="columns"
        gap={{ col: '100px', row: '20px' }}
        col={{
          smallDesktop: 2,
          desktop: 2,
          mobile: 1,
          tablet: 2,
        }}
      >
        <Grid layout="container" widthMax={'100%'} margin={'0 0 30px'}>
          <Select
            label="Year"
            name={'year'}
            options={Array.from({ length: Math.max(0, Number(currentYear) - START_YEAR + 1) }, (_, i) => {
              const y = START_YEAR + i;
              return { value: y.toString(), label: y.toString() };
            })}
            initialValue={{ value: year, label: year }}
            onBlur={(_, data) => setYear(data.value)}
          />
        </Grid>
      </Grid>

      {isLoading && <LoaderDots />}

      {!isLoading && isError && (
        <TextBox tag="p" desktopSize={16} mobileSize={16} fontWeight={500}>
          No results
        </TextBox>
      )}

      {!isLoading && !isError && (
        <>
          {resultsStatsWorkout.map((ex, i) => (
            <div key={i}>
              {ex.data?.code === 'OK' && (
                <Grid layout="container" widthMax={'100%'} margin="0px auto 30px auto" minHeight="700px">
                  <ChartLine
                    title={ex.data.data.workoutName}
                    data={chartDataWorkout(ex.data.data.reps, ex.data.data.workoutName)}
                  />
                </Grid>
              )}
            </div>
          ))}
        </>
      )}
    </Grid>
  );
};
