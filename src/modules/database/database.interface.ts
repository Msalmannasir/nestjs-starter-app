export interface DatabaseConfig {
  type: 'postgres' | 'mysql' | 'mongo' | 'sqlite';
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  database?: string;
  uri?: string;
}
