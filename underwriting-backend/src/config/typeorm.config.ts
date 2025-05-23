import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass@word1',
  database: 'underwriting',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true, 
};
