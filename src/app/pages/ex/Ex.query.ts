import { configApiOrigin } from '@app/config/configApiOrigin';
import { configFetch, executeFetch, type ResponseBase } from '@app/config/configFetch';

export interface QueryExDictionary extends ResponseBase {
  ex: {
    rest: number;
    reps: number[];
    dayOff: number;
    max?: number;
  }[];
}

export const queryExDictionary = (workoutName: string): Promise<QueryExDictionary> => {
  const endpointUrl = new URL(`/nook/json/${encodeURIComponent(workoutName)}.json`, window.location.origin);
  return executeFetch<QueryExDictionary>(endpointUrl, configFetch({ method: 'GET' }));
};

export const queryExCreate = (body: Record<string, string | number>): Promise<ResponseBase> => {
  const endpointUrl = new URL(`${configApiOrigin()}/gym/ex/create`);
  return executeFetch<ResponseBase>(endpointUrl, configFetch({ method: 'POST', body }));
};

export interface QueryExLevel extends ResponseBase {
  data: {
    level: string;
    repsMax: string;
  };
}

export const queryExLevel = (workoutName: string): Promise<QueryExLevel> => {
  const endpointUrl = new URL(`${configApiOrigin()}/gym/ex/level`);
  return executeFetch<QueryExLevel>(endpointUrl, configFetch({ method: 'POST', body: { workoutName } }));
};
