import { apiOrigin } from '@app/api/apiOrigin';
import type { FetchClientBaseResponse } from '@app/fetchClient/fetchClient.types';
import { fetchClientConfig } from '@app/fetchClient/fetchClientConfig';
import { fetchClientExecute } from '@app/fetchClient/fetchClientExecute';

export interface QueryWorkoutDictionaryResponse extends FetchClientBaseResponse {
  ex: {
    rest: number;
    reps: number[];
    dayOff: number;
    max?: number;
  }[];
}

export const queryWorkoutDictionary = (workoutName: string): Promise<QueryWorkoutDictionaryResponse> => {
  const endpointUrl = new URL(`/nook/json/${encodeURIComponent(workoutName)}.json`, window.location.origin);

  return fetchClientExecute<QueryWorkoutDictionaryResponse>(endpointUrl, fetchClientConfig({ method: 'GET' }));
};

export type QueryWorkoutCreatePayload = Record<string, string | number>;

export type QueryWorkoutCreateResponse = FetchClientBaseResponse;

export const queryWorkoutCreate = (payload: QueryWorkoutCreatePayload): Promise<QueryWorkoutCreateResponse> => {
  const endpointUrl = new URL(`${apiOrigin()}/gym/ex/create`);

  return fetchClientExecute<QueryWorkoutCreateResponse>(
    endpointUrl,
    fetchClientConfig({ method: 'POST', body: payload }),
  );
};

export interface QueryWorkoutLevelResponse extends FetchClientBaseResponse {
  data: {
    level: string;
    repsMax: string;
  };
}

export type QueryWorkoutLevelPayload = {
  workoutName: string;
};

export const queryWorkoutLevel = (workoutName: string): Promise<QueryWorkoutLevelResponse> => {
  const endpointUrl = new URL(`${apiOrigin()}/gym/ex/level`);

  return fetchClientExecute<QueryWorkoutLevelResponse>(
    endpointUrl,
    fetchClientConfig({ method: 'POST', body: { workoutName } }),
  );
};
