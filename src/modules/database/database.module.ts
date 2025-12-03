import { Module, DynamicModule } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseConfig } from './database.interface';

@Module({})
export class DatabaseModule {
  static forRootAsync(config: {
    useFactory: () => Promise<DatabaseConfig>;
  }): DynamicModule {
    const dbServiceProvider = {
      provide: DatabaseService,
      useFactory: async () => {
        const service = new DatabaseService();
        const dbConfig = await config.useFactory();
        await service.initializeConnection(dbConfig);
        return service;
      },
    };

    return {
      module: DatabaseModule,
      providers: [dbServiceProvider],
      exports: [dbServiceProvider],
    };
  }
}
