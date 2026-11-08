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

  const handleRowEdit = (form: Record<string, string>) => {
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

  const handleRowDel = (id: number | string) => {
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
      rowEdit={{
        isRowEditError: isErrorQueryInvoiceUpdate,
        isRowEditPending: isPendingQueryInvoiceUpdate,
        isRowEditSuccess: dataQueryInvoiceUpdate?.code === 'OK',
        rowEditErrorMsg: errorQueryInvoiceUpdate?.message,
        rowEditSuccessMsg: dataQueryInvoiceUpdate?.message,
        onRowEdit: (form) => {
          handleRowEdit(form);
        },
      }}
      rowDelete={{
        onRowDelete: (id) => {
          handleRowDel(id);
        },
        isRowDeleteError: isErrorQueryInvoiceDel,
        isRowDeletePending: isPendingQueryInvoiceDel,
        isRowDeleteSuccess: dataQueryInvoiceDel?.code === 'OK',
        rowDeleteErrorMsg: errorQueryInvoiceDel?.message,
        rowDeleteSuccessMsg: dataQueryInvoiceDel?.message,
      }}
      onRowReset={handleCellReset}
    />
  );
};
