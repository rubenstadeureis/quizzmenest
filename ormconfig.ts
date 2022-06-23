import { TypeOrmModuleOptions } from '@nestjs/typeorm';
const config: TypeOrmModuleOptions[] = [
  {
    name: 'default',
    type: 'mysql',
    host: 'localhost',
    port: 55001,
    username: 'root',
    password: 'mariadbpw',
    database: 'mysql',
    synchronize: true,
    autoLoadEntities: false,
    logging: false,
    entities: [__dirname + '/src/**/*.entity.{js,ts}'],
    migrations: [__dirname + '/src/infra/typeorm/migrations/*.ts'],
    timezone: '+03:00',
  },
];

export default config;
