import { Module } from '@nestjs/common';
import { ClientConfig } from 'pg';

import { ConfigurationService } from './configuration.service';
import { DatabaseService } from './database.service';

@Module({
  providers: [
    ConfigurationService,
    {
      provide: DatabaseService,
      inject: [ConfigurationService],
      useFactory: async (configurationService: ConfigurationService) => {
        const clientConfig: ClientConfig = {
          host: configurationService.psqlHost,
          port: configurationService.psqlPort,
          database: configurationService.psqlDatabase,
          user: configurationService.psqlUser,
          password: configurationService.psqlPassword,
        };

        const databaseService = new DatabaseService();
        await databaseService.connect(clientConfig);
        return databaseService;
      },
    },
  ],
})
export class InfrastructureModule {}
