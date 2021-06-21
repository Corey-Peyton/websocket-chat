import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigurationService {
  public psqlHost: string;
  public psqlPort: number;
  public psqlDatabase: string;
  public psqlUser: string;
  public psqlPassword: string;

  constructor() {
    this.psqlHost = process.env.PSQL_HOST;
    this.psqlPort = Number(process.env.PSQL_PORT);
    this.psqlDatabase = process.env.PSQL_DATABASE;
    this.psqlUser = process.env.PSQL_USER;
    this.psqlPassword = process.env.PSQL_PASSWORD;
  }
}
