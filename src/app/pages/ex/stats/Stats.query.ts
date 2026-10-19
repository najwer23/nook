import { configApiOrigin } from '@app/config/configApiOrigin';
import { configFetch, executeFetch, type ResponseBase } from '@app/config/configFetch';

export interface StatsWorkoutResponse extends ResponseBase {
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

export const queryStatsWorkout = (workoutName: string, year: string): Promise<StatsWorkoutResponse> => {
  const endpointUrl = new URL(`${configApiOrigin()}/gym/ex/stats`);
  return executeFetch<StatsWorkoutResponse>(endpointUrl, configFetch({ method: 'POST', body: { workoutName, year } }));
};
