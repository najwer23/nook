import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { useImmediateThrottledQuery } from '@app/hooks/useImmediateThrottledQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from 'najwer23morsels/lib/Button';
import { Dialog } from 'najwer23morsels/lib/Dialog';
import { Form, type FormType } from 'najwer23morsels/lib/Form';
import { Grid } from 'najwer23morsels/lib/Grid';
import { Input } from 'najwer23morsels/lib/Input';
import { LoaderDots } from 'najwer23morsels/lib/LoaderDots';
import { Table } from 'najwer23morsels/lib/Table';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { Typography } from 'najwer23morsels/lib/Typography';
import { useState } from 'react';
import { queryInvoiceAdd, queryRentTable } from './Rent.query';

// import styles from './Rent.module.css';

interface Props {}

export const Rent: React.FC<Props> = ({}) => {
  useDocumentTitle(`Rent | ${import.meta.env.VITE_ANALYTICS_APP_NAME}`);

  const queryClient = useQueryClient();

  const [isOpenDialogInvoiceAdd, setIsOpenDialogInvoiceAdd] = useState(false);
  const [dialogInvoiceAddKey, setDialogInvoiceAddKey] = useState(0);

  const {
    result: resultQueryRentTable,
    isLoading: isLoadingQueryRentTable,
    isError: isErrorQueryRentTable,
  } = useImmediateThrottledQuery(
    {
      queryKey: ['queryRentTable', 'queryRentTable'],
      queryFn: () => queryRentTable(),
      staleTime: 0,
      gcTime: 0,
      retry: 0,
      enabled: true,
    },
    500,
  );

  const {
    mutate: mutateQueryInvoiceAdd,
    isPending: isPendingQueryInvoiceAdd,
    isError: isErrorQueryInvoiceAdd,
    data: dataQueryInvoiceAdd,
    error: errorQueryInvoiceAdd,
    reset: resetQueryInvoiceAdd,
  } = useMutation({
    mutationKey: ['QueryInvoiceAdd', 'QueryInvoiceAdd'],
    mutationFn: queryInvoiceAdd,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['queryWeightGetByYear'],
      });

      setDialogInvoiceAddKey((prev) => prev + 1);
    },
  });

  const handleOnSubmitInvoiceAdd = (form: FormType) => {
    if (Object.values(form).some(({ error }) => error)) return;
    const dataForm = Object.fromEntries(Object.entries(form).map(([key, { value }]) => [key, value]));

    mutateQueryInvoiceAdd({
      ...dataForm,
    });
  };

  return (
    <Grid layout="container" widthMax={'100%'} padding="0">
      <Grid layout="container" widthMax="900px" margin="0 0 30px 0">
        <Typography appearance="light" variant="display" style={{ margin: 0 }}>
          Rent
        </Typography>
      </Grid>

      {isLoadingQueryRentTable && <LoaderDots />}

      {!isLoadingQueryRentTable && isErrorQueryRentTable && (
        <TextBox tag="p" desktopSize={16} mobileSize={16} fontWeight={500}>
          No results
        </TextBox>
      )}

      {!isLoadingQueryRentTable && (
        <Grid layout="container" widthMax={'100%'}>
          <Grid
            layout="flex"
            justifyContent="flex-start"
            flexWrap="wrap"
            gap={{ col: '20px', row: '20px' }}
            margin={'0px 0 20px'}
          >
            <Button
              height="40px"
              width="120px"
              backgroundColor="orangered"
              onClick={() => setIsOpenDialogInvoiceAdd(true)}
            >
              <TextBox mobileSize={18} desktopSize={18} color="white">
                Add Invoice
              </TextBox>
            </Button>

            <Dialog
              widthMax={'900px'}
              open={isOpenDialogInvoiceAdd}
              onCancel={() => {
                setIsOpenDialogInvoiceAdd(false);
                resetQueryInvoiceAdd();
              }}
            >
              <Grid
                layout="container"
                widthMin="min(800px, calc(100vw - 25px))"
                padding="0px 30px 30px 30px"
                margin="auto"
              >
                <Typography appearance="light" variant="subheading" style={{ margin: '0 0 20px 0' }}>
                  Add Invoice
                </Typography>

                <Form
                  key={dialogInvoiceAddKey}
                  onSubmit={handleOnSubmitInvoiceAdd}
                  isError={isErrorQueryInvoiceAdd}
                  isPending={isPendingQueryInvoiceAdd}
                  isSuccess={dataQueryInvoiceAdd?.code === 'OK'}
                  errorMsg={errorQueryInvoiceAdd?.message}
                  successMsg={dataQueryInvoiceAdd?.message}
                >
                  <Grid layout="columns" col={{ smallDesktop: 2 }} gap={{ col: '20px', row: '0px' }}>
                    {resultQueryRentTable?.data?.cols.map((col: any) => {
                      const isId = col.cellName === 'id';

                      return (
                        <Input
                          key={col.cellName}
                          label={col.cellText}
                          name={col.cellName}
                          type="text"
                          disabled={isId}
                          placeholder={col.cellText}
                        />
                      );
                    })}
                  </Grid>

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
                      width="80px"
                      padding={0}
                      backgroundColor="#4BB543"
                      backgroundColorDisabled="grey"
                    >
                      <TextBox tag="span" desktopSize={16} mobileSize={16} fontWeight={400} color="white">
                        Save
                      </TextBox>
                    </Button>
                  </Grid>
                </Form>
              </Grid>
            </Dialog>
          </Grid>

          <Table
            jsonSchema={{
              cols: resultQueryRentTable?.data?.cols,
            }}
            jsonData={{
              rows: resultQueryRentTable?.data?.rows,
            }}
            handleCellEdit={() => {}}
          />
        </Grid>
      )}
    </Grid>
  );
};
