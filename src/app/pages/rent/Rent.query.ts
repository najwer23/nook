import { apiOrigin } from '@app/api/apiOrigin';
import type { FetchClientBasePayload, FetchClientBaseResponse } from '@app/fetchClient/fetchClient.types';
import { fetchClientConfig } from '@app/fetchClient/fetchClientConfig';
import { fetchClientExecute } from '@app/fetchClient/fetchClientExecute';
import type { TableColumn, TableRow } from 'najwer23morsels/lib/Table';

export interface QueryRentTableResponse extends FetchClientBaseResponse {
  data?: {
    cols: TableColumn[];
    rows: TableRow[];
  };
}

export const queryRentTable = async (): Promise<QueryRentTableResponse> => {
  const endpointUrl = new URL(`${apiOrigin()}/invoices/Rent`);
  const response = await fetchClientExecute<QueryRentTableResponse>(endpointUrl, fetchClientConfig({ method: 'GET' }));

  return response;
};

export const queryInvoiceAdd = ({ type, ...payload }: FetchClientBasePayload): Promise<FetchClientBaseResponse> => {
  const endpointUrl = new URL(`${apiOrigin()}/invoices/${encodeURIComponent(type)}/add`);
  return fetchClientExecute<FetchClientBaseResponse>(endpointUrl, fetchClientConfig({ method: 'POST', body: payload }));
};

export const queryInvoiceUpdate = ({ type, ...payload }: FetchClientBasePayload): Promise<FetchClientBaseResponse> => {
  const endpointUrl = new URL(`${apiOrigin()}/invoices/${encodeURIComponent(type)}/update`);
  return fetchClientExecute<FetchClientBaseResponse>(endpointUrl, fetchClientConfig({ method: 'POST', body: payload }));
};

export const queryInvoiceDel = ({ type, ...payload }: FetchClientBasePayload): Promise<FetchClientBaseResponse> => {
  const endpointUrl = new URL(`${apiOrigin()}/invoices/${encodeURIComponent(type)}/del`);
  return fetchClientExecute<FetchClientBaseResponse>(endpointUrl, fetchClientConfig({ method: 'POST', body: payload }));
};

export interface QueryBalanceGetResponse extends FetchClientBaseResponse {
  data?: {
    credits: number;
  };
}

export const queryBalanceGet = async ({ type }: FetchClientBasePayload): Promise<QueryBalanceGetResponse> => {
  const endpointUrl = new URL(`${apiOrigin()}/balance/${encodeURIComponent(type)}`);
  return await fetchClientExecute<QueryBalanceGetResponse>(endpointUrl, fetchClientConfig({ method: 'GET' }));
};

export const queryBalanceAdd = ({ type, ...payload }: FetchClientBasePayload): Promise<FetchClientBaseResponse> => {
  const endpointUrl = new URL(`${apiOrigin()}/balance/${encodeURIComponent(type)}/add`);
  return fetchClientExecute<FetchClientBaseResponse>(endpointUrl, fetchClientConfig({ method: 'POST', body: payload }));
};
