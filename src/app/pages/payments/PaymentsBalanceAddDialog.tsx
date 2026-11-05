import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from 'najwer23morsels/lib/Button';
import { Dialog } from 'najwer23morsels/lib/Dialog';
import { Form, type FormType } from 'najwer23morsels/lib/Form';
import { Grid } from 'najwer23morsels/lib/Grid';
import { Input } from 'najwer23morsels/lib/Input';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { Typography } from 'najwer23morsels/lib/Typography';
import { useRef, useState } from 'react';
import { BALANCE_REFRESH_IDLE } from './Payments.const';
import { queryBalanceAdd } from './Payments.query';
import type { BalanceRefreshFlags } from './Payments.types';
import { hasInput } from './Payments.utils';

export const PaymentsBalanceAddDialog: React.FC<{
  type: string;
  onRefreshChange: (flags: BalanceRefreshFlags) => void;
}> = ({ type, onRefreshChange }) => {
  const queryClient = useQueryClient();

  const [isOpenDialogBalanceAdd, openDialogBalanceAdd] = useState(false);
  const [balanceAddFormKey, setBalanceAddFormKey] = useState(0);

  const hasChangedBalanceRef = useRef<BalanceRefreshFlags>(BALANCE_REFRESH_IDLE);

  const {
    mutate: mutateQueryBalanceAdd,
    isPending: isPendingQueryBalanceAdd,
    isError: isErrorQueryBalanceAdd,
    data: dataQueryBalanceAdd,
    error: errorQueryBalanceAdd,
    reset: resetQueryBalanceAdd,
  } = useMutation({
    mutationKey: ['queryBalanceAdd', 'queryBalanceAdd'],
    mutationFn: queryBalanceAdd,
    onSuccess: (data, variables) => {
      if (data?.code === 'OK') {
        hasChangedBalanceRef.current = {
          credits: hasChangedBalanceRef.current.credits || hasInput(variables.credits),
          bankAccountNumber: hasChangedBalanceRef.current.bankAccountNumber || hasInput(variables.bankAccountNumber),
        };
      }
      setBalanceAddFormKey((prev) => prev + 1);
    },
  });

  const handleOnSubmitBalanceAdd = (form: FormType) => {
    if (Object.values(form).some(({ error }) => error)) return;
    const dataForm = Object.fromEntries(Object.entries(form).map(([key, { value }]) => [key, value]));

    mutateQueryBalanceAdd({
      ...dataForm,
      type,
    });
  };

  const handleOnCancelDialogBalanceAdd = () => {
    openDialogBalanceAdd(false);

    setTimeout(() => {
      resetQueryBalanceAdd();

      const saved = hasChangedBalanceRef.current;
      if (!saved.credits && !saved.bankAccountNumber) return;
      hasChangedBalanceRef.current = BALANCE_REFRESH_IDLE;

      onRefreshChange(saved);

      queryClient
        .invalidateQueries({ queryKey: ['queryBalanceGet'] })
        .finally(() => onRefreshChange(BALANCE_REFRESH_IDLE));
    }, 300);
  };

  return (
    <>
      <Button variant="secondary" onClick={() => openDialogBalanceAdd(true)}>
        <TextBox mobileSize={16} desktopSize={16} color="inherit">
          Change Credits
        </TextBox>
      </Button>

      <Dialog widthMax={'900px'} open={isOpenDialogBalanceAdd} onCancel={handleOnCancelDialogBalanceAdd}>
        <Grid layout="container" widthMin={'min(800px, calc(100vw - 25px))'} padding="0px 30px 30px 30px" margin="auto">
          <Typography appearance="light" variant="subheading" style={{ margin: '0 0 20px 0' }}>
            Add Credits
          </Typography>

          <Form
            key={balanceAddFormKey}
            onSubmit={handleOnSubmitBalanceAdd}
            isError={isErrorQueryBalanceAdd}
            isPending={isPendingQueryBalanceAdd}
            isSuccess={dataQueryBalanceAdd?.code === 'OK'}
            errorMsg={errorQueryBalanceAdd?.message}
            successMsg={dataQueryBalanceAdd?.message}
          >
            <Grid layout="columns" col={{ smallDesktop: 2 }} gap={{ col: '20px', row: '0px' }}>
              <Input
                label="Credits"
                name="credits"
                type="number"
                step={0.01}
                placeholder="Credits"
                validatorOptions={[{ type: 'decimalDigits', options: { digits: 2 } }]}
              />

              <Input
                label="Bank Account Number"
                name="bankAccountNumber"
                type="text"
                placeholder="Bank Account Number"
              />
            </Grid>

            <Grid
              layout="flex"
              widthMax="100%"
              padding="0"
              justifyContent={'flex-end'}
              alignItems="right"
              margin="20px 0 0 0"
            >
              <Button type="submit" variant="primary">
                <TextBox desktopSize={16} mobileSize={16} color="inherit">
                  Save changes
                </TextBox>
              </Button>
            </Grid>
          </Form>
        </Grid>
      </Dialog>
    </>
  );
};
