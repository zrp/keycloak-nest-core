export type KncContentToken = {
  exp: number;
  iat: number;
  jti: string;
  iss: string;
  aud: string;
  sub: string;
  typ: string;
  azp: string;
  session_state: string;
  acr: string;
  'allowed-origins': string[];
  realm_access: {
    roles: string[];
  };
  resource_access: {
    account: {
      roles: string[];
    };
  };
  scope: string;
  sid: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
};

export type KncToken = {
  access_token: {
    token: string;
    clientId: string;
    header: {
      alg: string;
      typ: string;
      kid: string;
    };
    content: KncContentToken;
    signature: string;
    signed: string;
  };
  refresh_token: undefined;
  id_token: undefined;
  token_type: undefined;
  expires_in: undefined;
};
