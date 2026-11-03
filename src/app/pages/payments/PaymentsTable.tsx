import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Table, type TableColumn, type TableRow } from 'najwer23morsels/lib/Table';
import { useRef } from 'react';
import { queryInvoiceDel, queryInvoiceUpdate } from './Payments.query';

export const PaymentsTable: React.FC<{
  cols: TableColumn[];
  rows: TableRow[];
  isLoading: boolean;
  type: string;
}> = ({ cols, rows, isLoading, type }) => {
  const queryClient = useQueryClient();

  const hasChangedRowRef = useRef(false);

  const {
    mutate: mutateQueryInvoiceUpdate,
    isPending: isPendingQueryInvoiceUpdate,
    isError: isErrorQueryInvoiceUpdate,
    data: dataQueryInvoiceUpdate,
    error: errorQueryInvoiceUpdate,
    reset: resetQueryInvoiceUpdate,
  } = useMutation({
    mutationKey: ['queryInvoiceUpdate', 'queryInvoiceUpdate'],
    mutationFn: queryInvoiceUpdate,
    onSuccess: (data) => {
      if (data?.code === 'OK') hasChangedRowRef.current = true;
    },
  });

  const handleCellEdit = (form: Record<string, string>) => {
    mutateQueryInvoiceUpdate({
      ...form,
      type,
    });
  };

  const {
    mutate: mutateQueryInvoiceDel,
    isPending: isPendingQueryInvoiceDel,
    isError: isErrorQueryInvoiceDel,
    data: dataQueryInvoiceDel,
    error: errorQueryInvoiceDel,
    reset: resetQueryInvoiceDel,
  } = useMutation({
    mutationKey: ['queryInvoiceDel', 'queryInvoiceDel'],
    mutationFn: queryInvoiceDel,
    onSuccess: (data) => {
      if (data?.code === 'OK') hasChangedRowRef.current = true;
    },
  });

  const handleCellDel = (id: number | string) => {
    mutateQueryInvoiceDel({
      id: String(id),
      type,
    });
  };

  const handleCellReset = () => {
    resetQueryInvoiceDel();
    resetQueryInvoiceUpdate();
    if (hasChangedRowRef.current) {
      hasChangedRowRef.current = false;
      queryClient.invalidateQueries({ queryKey: ['queryPaymentsTable'] });
      queryClient.invalidateQueries({ queryKey: ['queryBalanceGet'] });
    }
  };

  return (
    <Table
      jsonSchema={{ cols }}
      jsonData={{ rows }}
      isLoading={isLoading}
      tableLoadingHeight={43 + 'px'}
      cellEdit={{
        isCellEditError: isErrorQueryInvoiceUpdate,
        isCellEditPending: isPendingQueryInvoiceUpdate,
        isCellEditSuccess: dataQueryInvoiceUpdate?.code === 'OK',
        cellEditErrorMsg: errorQueryInvoiceUpdate?.message,
        cellEditSuccessMsg: dataQueryInvoiceUpdate?.message,
        onCellEdit: (form) => {
          handleCellEdit(form);
        },
      }}
      cellDelete={{
        onCellDelete: (id) => {
          handleCellDel(id);
        },
        isCellDeleteError: isErrorQueryInvoiceDel,
        isCellDeletePending: isPendingQueryInvoiceDel,
        isCellDeleteSuccess: dataQueryInvoiceDel?.code === 'OK',
        cellDeleteErrorMsg: errorQueryInvoiceDel?.message,
        cellDeleteSuccessMsg: dataQueryInvoiceDel?.message,
      }}
      onCellReset={handleCellReset}
    />
  );
};
