import { apiOrigin } from '@app/api/apiOrigin';
import type { FetchClientBaseResponse } from '@app/fetchClient/fetchClient.types';
import { fetchClientConfig } from '@app/fetchClient/fetchClientConfig';
import { fetchClientExecute } from '@app/fetchClient/fetchClientExecute';

export interface QueryExDictionaryResponse extends FetchClientBaseResponse {
  ex: {
    rest: number;
    reps: number[];
    dayOff: number;
    max?: number;
  }[];
}

export const queryExDictionary = (workoutName: string): Promise<QueryExDictionaryResponse> => {
  const endpointUrl = new URL(`/nook/json/${encodeURIComponent(workoutName)}.json`, window.location.origin);
  return fetchClientExecute<QueryExDictionaryResponse>(endpointUrl, fetchClientConfig({ method: 'GET' }));
};

export type QueryExCreatePayload = Record<string, string | number>;

export type QueryExCreateResponse = FetchClientBaseResponse;

export const queryExCreate = (payload: QueryExCreatePayload): Promise<QueryExCreateResponse> => {
  const endpointUrl = new URL(`${apiOrigin()}/gym/ex/create`);

  return fetchClientExecute<QueryExCreateResponse>(
    endpointUrl,
    fetchClientConfig({
      method: 'POST',
      body: payload,
    }),
  );
};

export interface QueryExLevelResponse extends FetchClientBaseResponse {
  data: {
    level: string;
    repsMax: string;
  };
}

export type QueryExLevelPayload = {
  workoutName: string;
};

export const queryExLevel = (payload: QueryExLevelPayload): Promise<QueryExLevelResponse> => {
  const endpointUrl = new URL(`${apiOrigin()}/gym/ex/level`);

  return fetchClientExecute<QueryExLevelResponse>(
    endpointUrl,
    fetchClientConfig({
      method: 'POST',
      body: payload,
    }),
  );
};
