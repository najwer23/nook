import { configApiOrigin } from '@app/config/configApiOrigin';
import { configFetch, executeFetch, type ResponseBase } from '@app/config/configFetch';

type QueryVisitorsHits = {
  data: {
    items: {
      path: string;
      data: Record<string, number>[];
    }[];
  };
} & ResponseBase;

export const queryVisitorsHits = async (year: string): Promise<QueryVisitorsHits> => {
  const url = new URL(`${configApiOrigin()}/analytics/hits/app-name/najwer23.github.io/year/${year}`);
  const options = { ...configFetch({ method: 'GET' }) };
  return await executeFetch(url, options);
};
