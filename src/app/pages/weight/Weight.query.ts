import { configApiOrigin } from '@app/config/configApiOrigin';
import { configFetch, executeFetch, type ResponseBase } from '@app/config/configFetch';

export interface WeightEntry {
  date: string;
  weight: string;
}

export interface WeightGetStatsPayload {
  year: string;
}

export interface WeightGetStatsResponse extends ResponseBase {
  data: {
    weights: WeightEntry[];
  };
}

export const queryWeightGetStats = (year: string): Promise<WeightGetStatsResponse> => {
  const endpointUrl = new URL(`${configApiOrigin()}/gym/weight/stats`);
  const payload: WeightGetStatsPayload = { year };

  return executeFetch<WeightGetStatsResponse>(endpointUrl, configFetch({ method: 'POST', body: payload }));
};

export type WeighCreatePayload = Record<string, string> & {};

export type WeightCreateResponse = ResponseBase;

export const queryWeightCreate = (payload: WeighCreatePayload): Promise<WeightCreateResponse> => {
  const endpointUrl = new URL(`${configApiOrigin()}/gym/weight/create`);
  return executeFetch<WeightCreateResponse>(endpointUrl, configFetch({ method: 'POST', body: payload }));
};
