import { configApiOrigin } from '@app/config/configApiOrigin';
import { configFetch, executeFetch, type ResponseBase } from '@app/config/configFetch';

type QueryExDictionary = {
  ex: {
    rest: number;
    reps: number[];
    dayOff: number;
    max?: number;
  }[];
} & ResponseBase;

export const queryExDictionary = async (workoutName: string): Promise<QueryExDictionary> => {
  const url = new URL(`/nook/json/${workoutName}.json`, window.location.origin);
  return await executeFetch(url);
};

export const queryExCreate = async (body: Record<string, string | number>): Promise<ResponseBase> => {
  const url = new URL(`${configApiOrigin()}/gym/ex/create`);
  const options = { ...configFetch({ method: 'POST', body: body }) };
  return await executeFetch(url, options);
};

type QueryExLevel = {
  data: {
    level: string;
    repsMax: string;
  };
} & ResponseBase;

export const queryExLevel = async (workoutName: string): Promise<QueryExLevel> => {
  const url = new URL(`${configApiOrigin()}/gym/ex/level`);
  const options = { ...configFetch({ method: 'POST', body: { workoutName } }) };
  return await executeFetch(url, options);
};
