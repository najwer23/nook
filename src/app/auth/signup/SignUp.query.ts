import { configApiOrigin } from '@app/config/configApiOrigin';
import { configFetch, type ResponseBase } from '@app/config/configFetch';

type QueryProps = {
  data?: {};
} & ResponseBase;

export const querySignUp = async (body: Record<string, string>): Promise<QueryProps> => {
  const url = new URL(`${configApiOrigin()}/auth/sign-up`);
  const options = { ...configFetch({ method: 'POST', body: body }) };

  const response = await fetch(url, options);
  const data = await response.json();

  if (data.error) {
    throw Error(data.message);
  }

  return data;
};
