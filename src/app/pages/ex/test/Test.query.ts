import { configApiOrigin } from '@app/config/configApiOrigin';
import { configFetch, executeFetch, type ResponseBase } from '@app/config/configFetch';

export type TestPayload = Record<string, string>;

export type TestResponse = ResponseBase;

export const queryTest = (payload: TestPayload): Promise<TestResponse> => {
  const endpointUrl = new URL(`${configApiOrigin()}/gym/ex/create`);
  return executeFetch<TestResponse>(endpointUrl, configFetch({ method: 'POST', body: payload }));
};
