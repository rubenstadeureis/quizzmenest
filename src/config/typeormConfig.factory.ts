import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import TypeOrmConfig from 'ormconfig';
export function typeOrmConfigFactory(): TypeOrmModuleOptions {
  return TypeOrmConfig.find((item) => item.name === 'default');
}
