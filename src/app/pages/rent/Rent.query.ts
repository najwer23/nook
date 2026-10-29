import { apiOrigin } from '@app/api/apiOrigin';
import type { FetchClientBaseResponse } from '@app/fetchClient/fetchClient.types';
import { fetchClientConfig } from '@app/fetchClient/fetchClientConfig';
import { fetchClientExecute } from '@app/fetchClient/fetchClientExecute';

export type QueryRentTablePayload = Record<string, string> & {};

export interface QueryRentTableResponse extends FetchClientBaseResponse {
  data?: {
    cols: any;
    rows: any;
  };
}

export const queryRentTable = async (): Promise<QueryRentTableResponse> => {
  const endpointUrl = new URL(`${apiOrigin()}/invoices/Rent`);
  const response = await fetchClientExecute<QueryRentTableResponse>(endpointUrl, fetchClientConfig({ method: 'GET' }));

  return response;
};

export type QueryInvoiceAddResponse = FetchClientBaseResponse;

export const queryInvoiceAdd = (payload: QueryRentTablePayload): Promise<QueryInvoiceAddResponse> => {
  const endpointUrl = new URL(`${apiOrigin()}/invoices/Rent/add`);
  return fetchClientExecute<QueryInvoiceAddResponse>(endpointUrl, fetchClientConfig({ method: 'POST', body: payload }));
};
