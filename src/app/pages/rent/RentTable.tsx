import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Table, type TableColumn, type TableRow } from 'najwer23morsels/lib/Table';
import { useRef } from 'react';
import { queryInvoiceDel, queryInvoiceUpdate } from './Rent.query';

interface Props {
  cols: TableColumn[];
  rows: TableRow[];
  isLoading: boolean;
}

export const RentTable: React.FC<Props> = ({ cols, rows, isLoading }) => {
  const queryClient = useQueryClient();

  const hasChangedRowRef = useRef(false);

  const {
    mutate: mutateUpdate,
    isPending: isPendingUpdate,
    isError: isErrorUpdate,
    data: dataUpdate,
    error: errorUpdate,
    reset: resetUpdate,
  } = useMutation({
    mutationKey: ['QueryInvoiceUpdate', 'QueryInvoiceUpdate'],
    mutationFn: queryInvoiceUpdate,
    onSuccess: (data) => {
      if (data?.code === 'OK') hasChangedRowRef.current = true;
    },
  });

  const {
    mutate: mutateDel,
    isPending: isPendingDel,
    isError: isErrorDel,
    data: dataDel,
    error: errorDel,
    reset: resetDel,
  } = useMutation({
    mutationKey: ['queryInvoiceDel', 'queryInvoiceDel'],
    mutationFn: queryInvoiceDel,
    onSuccess: (data) => {
      if (data?.code === 'OK') hasChangedRowRef.current = true;
    },
  });

  const handleCellReset = () => {
    resetDel();
    resetUpdate();
    if (hasChangedRowRef.current) {
      hasChangedRowRef.current = false;
      queryClient.invalidateQueries({ queryKey: ['queryRentTable'] });
      queryClient.invalidateQueries({ queryKey: ['queryBalanceGet'] });
    }
  };

  return (
    <Table
      jsonSchema={{ cols }}
      jsonData={{ rows }}
      isLoading={isLoading}
      tableLoadingHeight={43.88 + 'px'}
      cellEdit={{
        isCellEditError: isErrorUpdate,
        isCellEditPending: isPendingUpdate,
        isCellEditSuccess: dataUpdate?.code === 'OK',
        cellEditErrorMsg: errorUpdate?.message,
        cellEditSuccessMsg: dataUpdate?.message,
        onCellEdit: (form) => mutateUpdate({ ...form }),
      }}
      cellDelete={{
        onCellDelete: (id) => mutateDel({ id: String(id) }),
        isCellDeleteError: isErrorDel,
        isCellDeletePending: isPendingDel,
        isCellDeleteSuccess: dataDel?.code === 'OK',
        cellDeleteErrorMsg: errorDel?.message,
        cellDeleteSuccessMsg: dataDel?.message,
      }}
      onCellReset={handleCellReset}
    />
  );
};
