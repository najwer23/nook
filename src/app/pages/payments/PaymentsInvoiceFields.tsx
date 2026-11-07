import { Calendar } from 'najwer23morsels/lib/Calendar';
import { Grid } from 'najwer23morsels/lib/Grid';
import { Input } from 'najwer23morsels/lib/Input';
import { Select } from 'najwer23morsels/lib/Select';
import type { TableColumn } from 'najwer23morsels/lib/Table';

export const PaymentsInvoiceFields: React.FC<{
  cols: TableColumn[];
}> = ({ cols }) => {
  return (
    <Grid layout="columns" col={{ smallDesktop: 2 }} gap={{ col: '20px', row: '0px' }}>
      {cols
        .filter((col) => col.disabledAdd !== true)
        .map((col) => {
          if (col.cellType === 'date') {
            return (
              <Calendar
                key={col.cellName}
                label={col.cellText}
                name={col.cellName}
                initialValue={col.initialValue}
                placeholder={col.cellText}
                disabled={col.disabledAdd}
                validatorOptions={col.validatorOptions}
              />
            );
          }

          if (col.cellType === 'select') {
            return (
              <Select
                key={col.cellName}
                name={col.cellName}
                options={col.options}
                initialValue={col.initialValue}
                disabled={col.disabledAdd}
                validatorOptions={col.validatorOptions}
              />
            );
          }

          return (
            <Input
              key={col.cellName}
              label={col.cellText}
              name={col.cellName}
              type={col.cellType}
              step={col.cellType === 'number' ? 0.01 : undefined}
              placeholder={col.cellText}
              disabled={col.disabledAdd}
              validatorOptions={col.validatorOptions}
            />
          );
        })}
    </Grid>
  );
};
