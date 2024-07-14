export interface IRevokedTokenRepository {
    create(token: string): Promise<void>;
    find(token: string): Promise<boolean>;
  }
  