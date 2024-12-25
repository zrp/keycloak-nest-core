export interface KeycloakConnectConfig {
  realm?: string
  resource?: string
  clientId?: string
  credentials?: {
    secret: string
  }
  publicClient?: boolean
  public?: boolean
  authServerUrl?: string
  serverUrl?: string
  minTimeBetweenJwksRequests?: number
  bearerOnly?: boolean
  realmPublicKey?: string
  verifyTokenAudience?: boolean
  confidentialPort?: string | number
  sslRequired?: string
  tokenDataProperty?: string
}
