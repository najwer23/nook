import { configApiOrigin } from '@app/config/configApiOrigin';
import { configFetch, executeFetch, type ResponseBase } from '@app/config/configFetch';

export interface WeightEntry {
  date: string;
  weight: string;
}

export interface DashboardWeightPayload {
  year: string;
}

export interface DashboardWeightResponse extends ResponseBase {
  data: {
    weights: WeightEntry[];
  };
}

export const queryDashboardWeight = (year: string): Promise<DashboardWeightResponse> => {
  const endpointUrl = new URL(`${configApiOrigin()}/gym/weight/stats`);
  const payload: DashboardWeightPayload = { year };

  return executeFetch<DashboardWeightResponse>(endpointUrl, configFetch({ method: 'POST', body: payload }));
};
