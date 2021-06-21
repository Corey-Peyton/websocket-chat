import { Injectable } from '@nestjs/common';
import { Pool, ClientConfig, QueryConfig, QueryResult } from 'pg';

@Injectable()
export class DatabaseService {
  private _client: Pool;
  async connect(clientConfig: ClientConfig): Promise<void> {
    this._client = new Pool(clientConfig);

    // Test connection
    const poolClient = await this._client.connect();
    poolClient.release();
  }

  async query(queryConfig: QueryConfig): Promise<QueryResult> {
    return this._client.query(queryConfig);
  }
}
