import { configApiOrigin } from '@app/config/configApiOrigin';
import { configFetch, executeFetch, type ResponseBase } from '@app/config/configFetch';

type QueryProps = {
  data: {
    weights: {
      date: string;
      weight: string;
    }[];
  };
} & ResponseBase;

export const queryDashboardWeight = async (year: string): Promise<QueryProps> => {
  const url = new URL(`${configApiOrigin()}/gym/weight/stats`);
  const options = { ...configFetch({ method: 'POST', body: { year } }) };
  return await executeFetch(url, options);
};
