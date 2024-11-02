import { Module } from "@nestjs/common";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

@Module({
  controllers: [],
  providers: [
    {
      provide: "DRIZZLE_CONNECTION",
      useFactory: async () => {
        const pool = new Pool({
          connectionString: process.env['DATABASE_URL'],
          max: 20, // Maximum number of clients in the pool
          idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
          connectionTimeoutMillis: 2000, // How long to wait for a connection
        });

        // Test the connection
        try {
          await pool.connect();
          console.log('Connected to the database');
        } catch (err) {
          console.error('Failed to connect to the database:', err);
          throw err;
        }

        return drizzle(pool,{schema});
      }
    }
  ],
  exports: ["DRIZZLE_CONNECTION"],
})
export class DatabaseModule {}
