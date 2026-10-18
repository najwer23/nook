import { configApiOrigin } from '@app/config/configApiOrigin';
import { configFetch, executeFetch, type ResponseBase } from '@app/config/configFetch';

export interface VisitorsHitsItem {
  path: string;
  data: Record<string, number>[];
}

export interface VisitorsHitsResponse extends ResponseBase {
  data: {
    items: VisitorsHitsItem[];
  };
}

export const queryVisitorsHits = (year: string): Promise<VisitorsHitsResponse> => {
  const endpointUrl = new URL(
    `${configApiOrigin()}/analytics/hits/app-name/najwer23.github.io/year/${encodeURIComponent(year)}`,
  );

  return executeFetch<VisitorsHitsResponse>(endpointUrl, configFetch({ method: 'GET' }));
};
