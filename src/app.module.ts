import { Module } from '@nestjs/common';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from '@common/constants/env-schema';
import { HealthModule } from '@modules/health/health.module';
import { DatabaseService } from '@modules/database/database.service';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envSchema,
    }),
    /* Uncomment this for DB connection, pass in required values for the type of DB you need to use */
    // DatabaseModule.forRootAsync({
    //   useFactory: async () => ({
    //     type: 'mongo',
    //     uri: process.env.DB_URI,
    //   }),
    // }),
    HealthModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
