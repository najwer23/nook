import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { useMutation } from '@tanstack/react-query';
import { Button } from 'najwer23morsels/lib/Button';
import { Form, type FormType } from 'najwer23morsels/lib/Form';
import { Grid } from 'najwer23morsels/lib/Grid';
import { Input } from 'najwer23morsels/lib/Input';
import { Select } from 'najwer23morsels/lib/Select';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { useSearchParams } from 'react-router-dom';
import { queryTest } from './Test.query';

export const Test: React.FC<{
  workoutName: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<'workout' | 'stats' | 'test'>>;
}> = ({ workoutName, setSelectedTab }) => {
  let [searchParams] = useSearchParams();

  useDocumentTitle(`Test${searchParams.get('workoutName') ? ': ' + searchParams.get('workoutName') : ''} | GYM`);

  const { mutate, isPending, isError, data, error } = useMutation({
    mutationKey: ['queryTest', 'queryTest'],
    mutationFn: queryTest,
    onSuccess: () => {
      setSelectedTab('stats');
    },
  });

  const handleOnSubmit = (form: FormType) => {
    if (Object.values(form).some(({ error }) => error)) return;
    const dataForm = Object.fromEntries(Object.entries(form).map(([key, { value }]) => [key, value]));

    mutate({
      kind: 'test',
      level: '-1',
      repsMax: dataForm.reps,
      ...dataForm,
    });
  };

  return (
    <Grid layout="container">
      <Form
        onSubmit={handleOnSubmit}
        isError={isError}
        isPending={isPending}
        isSuccess={data?.code === 'OK'}
        errorMsg={error?.message}
        successMsg={data?.message}
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
              disabled
              placeholder="Workout Name"
              initialValue={{
                value: workoutName,
                label: workoutName,
              }}
              label={'Workout Name'}
              validatorOptions={[{ type: 'empty' }]}
              name="workoutName"
              options={[
                { value: 'Push-ups', label: 'Push-ups' },
                { value: 'Squats', label: 'Squats' },
                { value: 'Sit-ups', label: 'Sit-ups' },
                { value: 'Pull-ups', label: 'Pull-ups' },
              ]}
            />

            <Input
              label="Number of repetitions"
              type="number"
              name="reps"
              placeholder="Number of repetitions"
              validatorOptions={[
                { type: 'empty' },
                { type: 'numberInRange', options: { min: 1, max: 1000 } },
                { type: 'naturalNumber' },
              ]}
            />

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
          </div>
        </Grid>
      </Form>
    </Grid>
  );
};
