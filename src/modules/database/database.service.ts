import { LoggerService } from '@common/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { DatabaseConfig } from './database.interface';

@Injectable()
export class DatabaseService {
  private readonly logger = new LoggerService(DatabaseService.name);

  constructor() {
    this.logger.log('DatabaseService initialized');
  }

  async initializeConnection(config: DatabaseConfig): Promise<void> {
    try {
      if (!config.type) throw new Error('Database type is required');
      this.logger.log(`Initializing database connection to ${config.type}`);
      switch (config.type) {
        case 'mongo':
          if (!config.uri) {
            throw new Error('MongoDB connection URI (DB_URI) is required');
          }
          this.logger.log(`Initializing MongoDB connection at ${config.uri}`);
          //   if (!config.uri) throw new Error('Mongo URI required');
          //   this.mongoClient = new MongoClient(config.uri);
          //   await this.mongoClient.connect();
          //   this.logger.log(`MongoDB connected at ${config.uri}`);
          break;

        case 'postgres':
          if (!config.host) throw new Error('DB host is required');
          if (!config.port) throw new Error('DB port is required');
          if (!config.username) throw new Error('DB username is required');
          if (!config.password) throw new Error('DB password is required');
          if (!config.database) throw new Error('DB name is required');
          this.logger.log(
            `Initializing ${config.type.toUpperCase()} connection at ${config.host}:${config.port}/${config.database}`,
          );
          //   this.pgClient = new PgClient({
          //     host: config.host,
          //     port: config.port,
          //     user: config.username,
          //     password: config.password,
          //     database: config.database,
          //   });
          //   await this.pgClient.connect();
          //   this.logger.log(
          //     `PostgreSQL connected at ${config.host}:${config.port}/${config.database}`,
          //   );
          break;

        case 'mysql':
          // similar to Postgres, using mysql2/promise
          break;

        case 'sqlite':
          // using sqlite3 + open
          break;

        default:
          throw new Error(`Unsupported DB type: ${config.type}`);
      }
    } catch (error) {
      this.logger.error('Failed to initialize database connection', error);
      throw error;
    }
  }
}
