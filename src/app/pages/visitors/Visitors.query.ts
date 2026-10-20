import { apiOrigin } from '@app/api/apiOrigin';
import type { FetchClientBaseResponse } from '@app/fetchClient/fetchClient.types';
import { fetchClientConfig } from '@app/fetchClient/fetchClientConfig';
import { fetchClientExecute } from '@app/fetchClient/fetchClientExecute';

export interface QueryVisitorsHitsItem {
  path: string;
  data: Record<string, number>[];
}

export interface QueryVisitorsHitsResponse extends FetchClientBaseResponse {
  data: {
    items: QueryVisitorsHitsItem[];
  };
}

export const queryVisitorsHits = (year: string): Promise<QueryVisitorsHitsResponse> => {
  const endpointUrl = new URL(
    `${apiOrigin()}/analytics/hits/app-name/najwer23.github.io/year/${encodeURIComponent(year)}`,
  );

  return fetchClientExecute<QueryVisitorsHitsResponse>(endpointUrl, fetchClientConfig({ method: 'GET' }));
};
