interface TokenResponse {
  access_token: string
  error?: string
}

interface TokenClient {
  requestAccessToken: (params: { prompt?: string }) => void
}

interface OAuth2Client {
  initTokenClient: (config: {
    client_id: string
    scope: string
    callback: (response: TokenResponse) => void
  }) => TokenClient
}

interface Accounts {
  oauth2: OAuth2Client
}

interface Google {
  accounts: Accounts
}

interface Window {
  google?: Google
}
