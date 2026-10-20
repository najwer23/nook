import { apiOrigin } from '@app/api/apiOrigin';
import type { FetchClientBaseResponse } from '@app/fetchClient/fetchClient.types';
import { fetchClientConfig } from '@app/fetchClient/fetchClientConfig';
import { fetchClientExecute } from '@app/fetchClient/fetchClientExecute';

export type QuerySignUpPayload = Record<string, string>;

export type QuerySignUpResponse = FetchClientBaseResponse;

export const querySignUp = (payload: QuerySignUpPayload): Promise<QuerySignUpResponse> => {
  const endpointUrl = new URL(`${apiOrigin()}/auth/sign-up`);

  return fetchClientExecute<QuerySignUpResponse>(
    endpointUrl,
    fetchClientConfig({
      method: 'POST',
      body: payload,
    }),
  );
};
