import { Unauthorized } from '@/errors';

const regExp = /Bearer (.*)/;

export function getToken(authorization: string) {
  const result = authorization.match(regExp);

  if (!result) {
    throw Unauthorized;
  }

  return result[1];
}
