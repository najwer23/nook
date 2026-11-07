import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from 'najwer23morsels/lib/Button';
import { Dialog } from 'najwer23morsels/lib/Dialog';
import { Form, type FormType } from 'najwer23morsels/lib/Form';
import { Grid } from 'najwer23morsels/lib/Grid';
import type { TableColumn } from 'najwer23morsels/lib/Table';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { Typography } from 'najwer23morsels/lib/Typography';
import { useState } from 'react';
import { queryInvoiceAdd } from './Payments.query';
import { PaymentsInvoiceFields } from './PaymentsInvoiceFields';

export const PaymentsInvoiceAddDialog: React.FC<{
  cols: TableColumn[];
  type: string;
}> = ({ cols, type }) => {
  const queryClient = useQueryClient();

  const [isOpenDialogInvoiceAdd, openDialogInvoiceAdd] = useState(false);
  const [invoiceAddFormKey, setInvoiceAddFormKey] = useState(0);

  const {
    mutate: mutateQueryInvoiceAdd,
    isPending: isPendingQueryInvoiceAdd,
    isError: isErrorQueryInvoiceAdd,
    data: dataQueryInvoiceAdd,
    error: errorQueryInvoiceAdd,
    reset: resetQueryInvoiceAdd,
  } = useMutation({
    mutationKey: ['queryInvoiceAdd', 'queryInvoiceAdd'],
    mutationFn: queryInvoiceAdd,
    onSuccess: () => {
      setInvoiceAddFormKey((prev) => prev + 1);
    },
  });

  const handleOnSubmitInvoiceAdd = (form: FormType) => {
    if (Object.values(form).some(({ error }) => error)) return;
    const dataForm = Object.fromEntries(Object.entries(form).map(([key, { value }]) => [key, value]));

    mutateQueryInvoiceAdd({
      ...dataForm,
      type,
    });
  };

  const handleOnCancelDialogInvoiceAdd = () => {
    openDialogInvoiceAdd(false);

    setTimeout(() => {
      resetQueryInvoiceAdd();

      queryClient.invalidateQueries({ queryKey: ['queryPaymentsTable'] });
      queryClient.invalidateQueries({ queryKey: ['queryBalanceGet'] });
    }, 300);
  };

  return (
    <>
      <Button variant="secondary" onClick={() => openDialogInvoiceAdd(true)}>
        <TextBox mobileSize={16} desktopSize={16} color="inherit">
          Add Invoice
        </TextBox>
      </Button>

      <Dialog widthMax={'900px'} open={isOpenDialogInvoiceAdd} onCancel={handleOnCancelDialogInvoiceAdd}>
        <Grid layout="container" widthMin="min(800px, calc(100vw - 25px))" padding="0px 30px 30px 30px" margin="auto">
          <Typography variant="subheading" style={{ margin: '0 0 20px 0' }}>
            Add Invoice
          </Typography>

          <Form
            key={invoiceAddFormKey}
            onSubmit={handleOnSubmitInvoiceAdd}
            isError={isErrorQueryInvoiceAdd}
            isPending={isPendingQueryInvoiceAdd}
            isSuccess={dataQueryInvoiceAdd?.code === 'OK'}
            errorMsg={errorQueryInvoiceAdd?.message}
            successMsg={dataQueryInvoiceAdd?.message}
          >
            <PaymentsInvoiceFields cols={cols} />

            <Grid
              layout="flex"
              widthMax="100%"
              padding="0"
              justifyContent={'flex-end'}
              alignItems="right"
              margin="20px 0 0 0"
            >
              <Button type="submit" variant="primary">
                <TextBox tag="span" desktopSize={16} mobileSize={16} color="inherit">
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
