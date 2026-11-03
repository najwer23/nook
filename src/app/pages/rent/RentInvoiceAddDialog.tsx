import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from 'najwer23morsels/lib/Button';
import { Dialog } from 'najwer23morsels/lib/Dialog';
import { Form, type FormType } from 'najwer23morsels/lib/Form';
import { Grid } from 'najwer23morsels/lib/Grid';
import type { TableColumn } from 'najwer23morsels/lib/Table';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { Typography } from 'najwer23morsels/lib/Typography';
import { useRef, useState } from 'react';
import { queryInvoiceAdd } from './Rent.query';
import { RentInvoiceFields } from './RentInvoiceFields';

export const RentInvoiceAddDialog: React.FC<{
  cols: TableColumn[];
  type: string;
}> = ({ cols, type }) => {
  const queryClient = useQueryClient();

  const [isOpenDialogInvoiceAdd, openDialogInvoiceAdd] = useState(false);
  const [invoiceAddFormKey, setInvoiceAddFormKey] = useState(0);

  const hasChangedInvoiceRef = useRef(false);

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
    onSuccess: (data) => {
      if (data?.code === 'OK') {
        hasChangedInvoiceRef.current = true;
      }
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
    resetQueryInvoiceAdd();
    if (hasChangedInvoiceRef.current) {
      hasChangedInvoiceRef.current = false;
      queryClient.invalidateQueries({ queryKey: ['queryRentTable'] });
      queryClient.invalidateQueries({ queryKey: ['queryBalanceGet'] });
    }
  };

  return (
    <>
      <Button height="40px" width="120px" backgroundColor="orangered" onClick={() => openDialogInvoiceAdd(true)}>
        <TextBox mobileSize={18} desktopSize={18} color="white">
          Add Invoice
        </TextBox>
      </Button>

      <Dialog widthMax={'900px'} open={isOpenDialogInvoiceAdd} onCancel={handleOnCancelDialogInvoiceAdd}>
        <Grid layout="container" widthMin="min(800px, calc(100vw - 25px))" padding="0px 30px 30px 30px" margin="auto">
          <Typography appearance="light" variant="subheading" style={{ margin: '0 0 20px 0' }}>
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
            <RentInvoiceFields cols={cols} />

            <Grid
              layout="flex"
              widthMax="100%"
              padding="0"
              justifyContent={'flex-end'}
              alignItems="right"
              margin="20px 0 0 0"
            >
              <Button
                type="submit"
                height="40px"
                width="auto"
                padding={'0 10px'}
                backgroundColor="#4BB543"
                backgroundColorDisabled="grey"
              >
                <TextBox tag="span" desktopSize={16} mobileSize={16} fontWeight={400} color="white">
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
