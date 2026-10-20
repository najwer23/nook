import { apiOrigin } from '@app/api/apiOrigin';
import type { FetchClientBaseResponse } from '@app/fetchClient/fetchClient.types';
import { fetchClientConfig } from '@app/fetchClient/fetchClientConfig';
import { fetchClientExecute } from '@app/fetchClient/fetchClientExecute';

export interface QueryStatsWorkoutResponse extends FetchClientBaseResponse {
  data: {
    repsMax: string;
    level: string;
    workoutName: string;
    reps: {
      date: string;
      kind: string;
      reps: string;
    }[];
  };
}

export type QueryStatsWorkoutPayload = {
  workoutName: string;
  year: string;
};

export const queryStatsWorkout = (payload: QueryStatsWorkoutPayload): Promise<QueryStatsWorkoutResponse> => {
  const endpointUrl = new URL(`${apiOrigin()}/gym/ex/stats`);

  return fetchClientExecute<QueryStatsWorkoutResponse>(
    endpointUrl,
    fetchClientConfig({
      method: 'POST',
      body: payload,
    }),
  );
};
