import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { useImmediateThrottledQuery } from '@app/hooks/useImmediateThrottledQuery';
import { useMutation } from '@tanstack/react-query';
import { Button } from 'najwer23morsels/lib/Button';
import { Form, type FormType } from 'najwer23morsels/lib/Form';
import { Grid } from 'najwer23morsels/lib/Grid';
import { Input } from 'najwer23morsels/lib/Input';
import { LoaderDots } from 'najwer23morsels/lib/LoaderDots';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { Typography } from 'najwer23morsels/lib/Typography';
import React, { useLayoutEffect, useMemo, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import styles from './Ex.module.css';
import { queryExCreate, queryExDictionary, queryExLevel } from './Ex.query';
import { Timer } from './timer/Timer';

export const Ex: React.FC<{
  workoutName: string;
}> = ({ workoutName }) => {
  const navigate = useNavigate();

  const [repCurrent, setRepCurrent] = useState(0);
  const [repCurrentTimer, setRepCurrentTimer] = useState(0);
  const [repCurrentChange, setRepCurrentChange] = useState('stop');

  useDocumentTitle(`${workoutName} | ${import.meta.env.VITE_ANALYTICS_APP_NAME}`);

  const { mutate, isPending, isError, data, error } = useMutation({
    mutationKey: ['queryExCreate', workoutName],
    mutationFn: queryExCreate,
  });

  const {
    result: resultQueryExDictionary,
    isLoading: isLoadingQueryExDictionary,
    isError: isErrorQueryExDictionary,
  } = useImmediateThrottledQuery(
    {
      queryKey: ['queryExDictionary', workoutName],
      queryFn: () => queryExDictionary(workoutName),
      staleTime: Infinity,
      gcTime: 0,
      retry: 0,
      enabled: true,
    },
    500,
  );

  const {
    result: resultQueryExLevel,
    isLoading: isLoadingQueryExLevel,
    isError: isErrorQueryExLevel,
  } = useImmediateThrottledQuery(
    {
      queryKey: ['queryExLevel', workoutName],
      queryFn: () => queryExLevel(workoutName),
      staleTime: Infinity,
      gcTime: 0,
      retry: 0,
      enabled: true,
    },
    500,
  );

  const isLoading = isLoadingQueryExDictionary || isLoadingQueryExLevel;
  const isQueryError = isErrorQueryExDictionary || isErrorQueryExLevel;

  const exercises = resultQueryExDictionary?.ex ?? [];
  const levelData = resultQueryExLevel?.data;

  const needsTest = !!levelData && levelData.level === '-1' && !levelData.repsMax;

  useLayoutEffect(() => {
    if (needsTest || isErrorQueryExLevel) {
      navigate({
        pathname: '/in/test',
        search: `?${createSearchParams({ workoutName })}`,
      });
    }
  }, [needsTest, isErrorQueryExLevel]);

  const workoutLevel = useMemo(() => {
    if (!levelData || exercises.length === 0) return 0;

    if (levelData.level === '-1') {
      if (levelData.repsMax) {
        for (let i = 0; i < exercises.length; i++) {
          if (exercises[i].max && Number(levelData.repsMax) <= Number(exercises[i].max)) {
            return i;
          }
        }
      }
      return 0;
    }

    return Math.min(exercises.length - 1, Number(levelData.level));
  }, [levelData, exercises]);

  const currentExercise = exercises[workoutLevel];
  const currentReps = currentExercise?.reps ?? [];
  const currentRest = currentExercise?.rest ?? 0;

  const handleOnSubmit = async (form: FormType) => {
    if (Object.values(form).some(({ error }) => error)) return;
    const dataForm = Object.fromEntries(Object.entries(form).map(([key, { value }]) => [key, value]));

    const dictionarySumReps = currentReps.reduce((a, b) => Number(a) + Number(b), 0);
    const currentSumReps = Object.values(dataForm).reduce((a, b) => Number(a) + Number(b), 0);

    mutate({
      level: currentSumReps >= dictionarySumReps ? workoutLevel + 1 : workoutLevel,
      workoutName,
      kind: 'ex',
      reps: currentSumReps,
    });
  };

  return (
    <Grid layout="container" widthMax={'1400px'}>
      <Grid layout="container" widthMax={'100%'} margin={'0 0 30px 0'}>
        <Typography appearance="light" variant="display" style={{ margin: 0 }}>
          {workoutName}
        </Typography>
      </Grid>

      {isLoading && <LoaderDots />}

      {!isLoading && isQueryError && (
        <TextBox tag="p" desktopSize={16} mobileSize={16} fontWeight={500}>
          No results
        </TextBox>
      )}

      {!isLoading && !isQueryError && !needsTest && (
        <>
          <Grid margin={'0 0 30px'} layout="container" widthMax={'100%'}>
            <Typography appearance="light" variant="subheading" style={{ margin: 0 }}>
              Level: <b>{workoutLevel}</b>
            </Typography>
          </Grid>

          <Grid
            layout="columns"
            padding="0"
            margin="0"
            col={{ mobile: 1, smallDesktop: 2, desktop: 2, tablet: 2 }}
            gap={{ col: '50px', row: '50px' }}
          >
            <div>
              <Form
                onSubmit={handleOnSubmit}
                isError={isError}
                isPending={isPending}
                isSuccess={data?.code === 'OK'}
                errorMsg={error?.message}
                successMsg={data?.message}
              >
                {currentReps.map((v, index) => (
                  <div key={index} className={styles.repRow}>
                    <Input
                      style={{ width: 'calc(100% - 70px)' }}
                      defaultValue={String(v)}
                      label={`Repetition: ${index + 1}`}
                      type="text"
                      name={`reps${index}`}
                      disabled={repCurrent != index}
                      validatorOptions={[
                        { type: 'empty' },
                        { type: 'numberInRange', options: { min: 1, max: 1000 } },
                        { type: 'naturalNumber' },
                      ]}
                    />
                    <Button
                      type="button"
                      disabled={repCurrent == index}
                      onClick={() => {
                        setRepCurrent(index);
                        setRepCurrentChange('stop' + index);
                      }}
                      height={'40px'}
                      width={'70px'}
                      backgroundColor="orangered"
                      backgroundColorDisabled="grey"
                      margin={'10px 0 0 0'}
                    >
                      <TextBox tag="span" desktopSize={16} mobileSize={16} fontWeight={400} color="white">
                        Unlock
                      </TextBox>
                    </Button>
                  </div>
                ))}
                <Button
                  type="submit"
                  disabled={isPending}
                  height={'40px'}
                  width={'80px'}
                  padding={0}
                  backgroundColor="orangered"
                  backgroundColorDisabled="grey"
                >
                  <TextBox tag="span" desktopSize={16} mobileSize={16} fontWeight={400} color="white">
                    Submit
                  </TextBox>
                </Button>
              </Form>
            </div>
            <div>
              <Timer
                time={currentRest}
                repCurrent={repCurrentTimer}
                repCurrentChange={repCurrentChange}
                forceStop={repCurrent > currentReps.length - 1}
              />
              <div className={styles.repsDone}>
                <Button
                  onClick={() => {
                    setRepCurrentTimer(repCurrentTimer + 1);
                    setRepCurrent(repCurrent + 1);
                    setRepCurrentChange('play' + repCurrent + 1);
                  }}
                  type="button"
                  height={'100px'}
                  width={'100%'}
                  backgroundColor="#9dae11"
                  backgroundColorDisabled="grey"
                >
                  <TextBox tag="span" desktopSize={30} mobileSize={30} fontWeight={600} color="white">
                    Done!
                  </TextBox>
                </Button>
              </div>
            </div>
          </Grid>
        </>
      )}
    </Grid>
  );
};
