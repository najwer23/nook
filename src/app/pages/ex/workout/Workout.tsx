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
import { useLayoutEffect, useMemo, useState } from 'react';
import { Timer } from '../timer/Timer';
import styles from './Workout.module.css';
import { queryWorkoutCreate, queryWorkoutDictionary, queryWorkoutLevel } from './Workout.query';

export const Workout: React.FC<{
  workoutName: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<'workout' | 'stats' | 'test'>>;
}> = ({ workoutName, setSelectedTab }) => {
  const [repCurrent, setRepCurrent] = useState(0);
  const [repCurrentTimer, setRepCurrentTimer] = useState(0);
  const [repCurrentChange, setRepCurrentChange] = useState('stop');

  useDocumentTitle(`Workout: ${workoutName} | ${import.meta.env.VITE_ANALYTICS_APP_NAME}`);

  const {
    mutate: mutateQueryWorkoutCreate,
    isPending: isPendingQueryWorkoutCreate,
    isError: isErrorQueryWorkoutCreate,
    data: dataQueryWorkoutCreate,
    error: errorQueryWorkoutCreate,
  } = useMutation({
    mutationKey: ['queryWorkoutCreate', workoutName],
    mutationFn: queryWorkoutCreate,
    onSuccess: () => {
      setSelectedTab('stats');
    },
  });

  const {
    result: resultQueryWorkoutDictionary,
    isLoading: isLoadingQueryWorkoutDictionary,
    isError: isErrorQueryWorkoutDictionary,
  } = useImmediateThrottledQuery(
    {
      queryKey: ['queryWorkoutDictionary', workoutName],
      queryFn: () => queryWorkoutDictionary(workoutName),
      staleTime: Infinity,
      gcTime: 0,
      retry: 0,
      enabled: true,
    },
    500,
  );

  const {
    result: resultQueryWorkoutLevel,
    isLoading: isLoadingQueryWorkoutLevel,
    isError: isErrorQueryWorkoutLevel,
  } = useImmediateThrottledQuery(
    {
      queryKey: ['queryWorkoutLevel', workoutName],
      queryFn: () => queryWorkoutLevel(workoutName),
      staleTime: Infinity,
      gcTime: 0,
      retry: 0,
      enabled: true,
    },
    500,
  );

  const isLoadingQueryWorkout = isLoadingQueryWorkoutDictionary || isLoadingQueryWorkoutLevel;
  const isErrorQueryWorkout = isErrorQueryWorkoutDictionary || isErrorQueryWorkoutLevel;

  const exercises = resultQueryWorkoutDictionary?.ex ?? [];
  const levelData = resultQueryWorkoutLevel?.data;

  const needsTest = !!levelData && levelData.level === '-1' && !levelData.repsMax;

  useLayoutEffect(() => {
    if (needsTest || isErrorQueryWorkoutLevel) {
      setSelectedTab('test');
    }
  }, [needsTest, isErrorQueryWorkoutLevel, setSelectedTab]);

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

  const handleOnSubmitWorkoutCreate = (form: FormType) => {
    if (Object.values(form).some(({ error }) => error)) return;

    const dataForm = Object.fromEntries(Object.entries(form).map(([key, { value }]) => [key, value]));

    const dictionarySumReps = currentReps.reduce((a, b) => Number(a) + Number(b), 0);
    const currentSumReps = Object.values(dataForm).reduce((a, b) => Number(a) + Number(b), 0);

    mutateQueryWorkoutCreate({
      level: currentSumReps >= dictionarySumReps ? workoutLevel + 1 : workoutLevel,
      workoutName,
      kind: 'ex',
      reps: currentSumReps,
    });
  };

  return (
    <Grid layout="container">
      {isLoadingQueryWorkout && <LoaderDots />}

      {!isLoadingQueryWorkout && isErrorQueryWorkout && (
        <TextBox tag="p" desktopSize={16} mobileSize={16} fontWeight={500}>
          No results
        </TextBox>
      )}

      {!isLoadingQueryWorkout && !isErrorQueryWorkout && !needsTest && (
        <>
          <Grid margin="0 0 30px" layout="container" widthMax="100%">
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
                onSubmit={handleOnSubmitWorkoutCreate}
                isError={isErrorQueryWorkoutCreate}
                isPending={isPendingQueryWorkoutCreate}
                isSuccess={dataQueryWorkoutCreate?.code === 'OK'}
                errorMsg={errorQueryWorkoutCreate?.message}
                successMsg={dataQueryWorkoutCreate?.message}
              >
                {currentReps.map((reps, index) => (
                  <div key={index} className={styles.repRow}>
                    <Input
                      style={{ width: 'calc(100% - 70px)' }}
                      defaultValue={String(reps)}
                      label={`Repetition: ${index + 1}`}
                      type="number"
                      name={`reps${index}`}
                      disabled={repCurrent !== index}
                      validatorOptions={[
                        { type: 'empty' },
                        { type: 'numberInRange', options: { min: 1, max: 1000 } },
                        { type: 'naturalNumber' },
                      ]}
                    />

                    <Button
                      type="button"
                      disabled={repCurrent === index}
                      onClick={() => {
                        setRepCurrent(index);
                        setRepCurrentChange('stop' + index);
                      }}
                      height="40px"
                      width="70px"
                      backgroundColor="orangered"
                      backgroundColorDisabled="grey"
                      margin="10px 0 0 0"
                    >
                      <TextBox tag="span" desktopSize={16} mobileSize={16} fontWeight={400} color="white">
                        Unlock
                      </TextBox>
                    </Button>
                  </div>
                ))}

                <Button
                  type="submit"
                  disabled={isPendingQueryWorkoutCreate}
                  height="40px"
                  width="80px"
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
                    setRepCurrentTimer((prev) => prev + 1);
                    setRepCurrent((prev) => prev + 1);
                    setRepCurrentChange('play' + (repCurrent + 1));
                  }}
                  type="button"
                  height="100px"
                  width="100%"
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
