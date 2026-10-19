import { configApiOrigin } from '@app/config/configApiOrigin';
import { configFetch, executeFetch, type ResponseBase } from '@app/config/configFetch';

export interface QueryWorkoutDictionary extends ResponseBase {
  ex: {
    rest: number;
    reps: number[];
    dayOff: number;
    max?: number;
  }[];
}

export const queryWorkoutDictionary = (workoutName: string): Promise<QueryWorkoutDictionary> => {
  const endpointUrl = new URL(`/nook/json/${encodeURIComponent(workoutName)}.json`, window.location.origin);
  return executeFetch<QueryWorkoutDictionary>(endpointUrl, configFetch({ method: 'GET' }));
};

export const queryWorkoutCreate = (body: Record<string, string | number>): Promise<ResponseBase> => {
  const endpointUrl = new URL(`${configApiOrigin()}/gym/ex/create`);
  return executeFetch<ResponseBase>(endpointUrl, configFetch({ method: 'POST', body }));
};

export interface QueryWorkoutLevel extends ResponseBase {
  data: {
    level: string;
    repsMax: string;
  };
}

export const queryWorkoutLevel = (workoutName: string): Promise<QueryWorkoutLevel> => {
  const endpointUrl = new URL(`${configApiOrigin()}/gym/ex/level`);
  return executeFetch<QueryWorkoutLevel>(endpointUrl, configFetch({ method: 'POST', body: { workoutName } }));
};
