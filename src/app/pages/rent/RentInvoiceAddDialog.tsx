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

interface Props {
  cols: TableColumn[];
}

export const RentInvoiceAddDialog: React.FC<Props> = ({ cols }) => {
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const hasAddedInvoiceRef = useRef(false);

  const { mutate, isPending, isError, data, error, reset } = useMutation({
    mutationKey: ['QueryInvoiceAdd', 'QueryInvoiceAdd'],
    mutationFn: queryInvoiceAdd,
    onSuccess: (response) => {
      if (response?.code === 'OK') {
        hasAddedInvoiceRef.current = true;
      }
      setFormKey((prev) => prev + 1);
    },
  });

  const handleSubmit = (form: FormType) => {
    if (Object.values(form).some(({ error: fieldError }) => fieldError)) return;
    const dataForm = Object.fromEntries(Object.entries(form).map(([key, { value }]) => [key, value]));

    mutate({
      ...dataForm,
    });
  };

  const handleCancel = () => {
    setIsOpen(false);
    reset();
    if (hasAddedInvoiceRef.current) {
      hasAddedInvoiceRef.current = false;
      queryClient.invalidateQueries({ queryKey: ['queryRentTable'] });
      queryClient.invalidateQueries({ queryKey: ['queryBalanceGet'] });
    }
  };

  return (
    <>
      <Button height="40px" width="120px" backgroundColor="orangered" onClick={() => setIsOpen(true)}>
        <TextBox mobileSize={18} desktopSize={18} color="white">
          Add Invoice
        </TextBox>
      </Button>

      <Dialog widthMax={'900px'} open={isOpen} onCancel={handleCancel}>
        <Grid layout="container" widthMin="min(800px, calc(100vw - 25px))" padding="0px 30px 30px 30px" margin="auto">
          <Typography appearance="light" variant="subheading" style={{ margin: '0 0 20px 0' }}>
            Add Invoice
          </Typography>

          <Form
            key={formKey}
            onSubmit={handleSubmit}
            isError={isError}
            isPending={isPending}
            isSuccess={data?.code === 'OK'}
            errorMsg={error?.message}
            successMsg={data?.message}
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
