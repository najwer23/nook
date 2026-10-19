import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { useImmediateThrottledQuery } from '@app/hooks/useImmediateThrottledQuery';
import { useMutation } from '@tanstack/react-query';
import { Button } from 'najwer23morsels/lib/Button';
import { Form, type FormType } from 'najwer23morsels/lib/Form';
import { Grid } from 'najwer23morsels/lib/Grid';
import { Input } from 'najwer23morsels/lib/Input';
import { Loader } from 'najwer23morsels/lib/Loader';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { useLayoutEffect, useMemo, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import styles from './Ex.module.css';
import { queryExCreate, queryExDictionary, queryExLevel } from './Ex.query';
import { Timer } from './timer/Timer';

export const Ex: React.FC<{
  workoutName: string;
}> = ({ workoutName }) => {
  const [repCurrent, setRepCurrent] = useState(0);
  const [repCurrentTimer, setRepCurrentTimer] = useState(0);
  const [repCurrentChange, setRepCurrentChange] = useState('stop');
  const navigate = useNavigate();
  const [isLayoutLoading, setIsLayoutLoading] = useState(true);

  useDocumentTitle(`${workoutName} | GYM`);

  const { mutate, isPending, isError, data, error } = useMutation({
    mutationKey: ['queryExCreate', workoutName],
    mutationFn: queryExCreate,
  });

  const { result: resultQueryExDictionary, isLoading: isLoadingQueryExDictionary } = useImmediateThrottledQuery(
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

  useLayoutEffect(() => {
    const navObj = {
      pathname: '/in/test',
      search: `?${createSearchParams({
        workoutName,
      })}`,
    };

    if (resultQueryExLevel) {
      if (resultQueryExLevel.data.level == '-1' && !resultQueryExLevel.data.repsMax) {
        navigate(navObj);
      } else {
        setIsLayoutLoading(false);
      }
    }

    if (isErrorQueryExLevel) {
      navigate(navObj);
    }
  }, [resultQueryExLevel, isErrorQueryExLevel]);

  const workoutLevel = useMemo(() => {
    if (!resultQueryExLevel?.data || !resultQueryExDictionary) return 0;

    if (resultQueryExLevel?.data.level === '-1') {
      if (resultQueryExLevel?.data.repsMax) {
        for (let i = 0; i < resultQueryExDictionary?.ex.length; i++) {
          if (
            resultQueryExDictionary?.ex[i].max &&
            Number(resultQueryExLevel?.data.repsMax) <= Number(resultQueryExDictionary?.ex[i].max)
          ) {
            return i;
          }
        }
      }
      return 0;
    } else {
      return Math.min(resultQueryExDictionary.ex.length - 1, Number(resultQueryExLevel?.data.level));
    }
  }, [resultQueryExLevel, resultQueryExDictionary?.ex]);

  const handleOnSubmit = async (form: FormType) => {
    if (Object.values(form).some(({ error }) => error)) return;
    const dataForm = Object.fromEntries(Object.entries(form).map(([key, { value }]) => [key, value]));

    let dictionarySumReps =
      resultQueryExDictionary?.ex[workoutLevel].reps.reduce((a, b) => Number(a) + Number(b), 0) ?? 0;
    let currentSumReps = Object.values(dataForm).reduce((a, b) => Number(a) + Number(b), 0);

    mutate({
      level: currentSumReps >= dictionarySumReps ? workoutLevel + 1 : workoutLevel,
      workoutName,
      kind: 'ex',
      reps: currentSumReps,
    });
  };

  return (
    <Grid layout="container" widthMax={'1400px'} padding={'clamp(40px, 8vw, 60px) 20px 60px 20px'}>
      <TextBox tag="h2" desktopSize={50} mobileSize={40} fontWeight={500} margin={'0 0 30px 0'}>
        {workoutName}
      </TextBox>
      {(isLoadingQueryExDictionary || isLoadingQueryExLevel) && (
        <Grid layout="container" widthMax={'1400px'} padding={'0px 0px 60px 0px'}>
          <Loader minHeight="400px" />
        </Grid>
      )}
      {!isLoadingQueryExDictionary && !isLoadingQueryExLevel && !isLayoutLoading && (
        <>
          <TextBox tag="h3" desktopSize={14} mobileSize={14} fontWeight={500} margin={'0 0 40px 0'}>
            level: {workoutLevel}
          </TextBox>

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
                {resultQueryExDictionary?.ex[workoutLevel]?.reps.map((v, index) => (
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
                time={resultQueryExDictionary?.ex[workoutLevel]?.rest ?? 0}
                repCurrent={repCurrentTimer}
                repCurrentChange={repCurrentChange}
                forceStop={repCurrent > (resultQueryExDictionary?.ex[workoutLevel]?.reps.length ?? 0) - 1}
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
                  backgroundColor="	#9dae11"
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
