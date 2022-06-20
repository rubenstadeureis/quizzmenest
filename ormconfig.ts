import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions[] = [
  {
    name: 'default',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'crud',
    synchronize: true,
    autoLoadEntities: false,
    logging: false,
    entities: [__dirname + '/src/**/*.entity.{js,ts}'],
    migrations: [__dirname + '/src/infra/typeorm/migrations/*.ts'],

    timezone: '+03:00',
  },
];

export default config;
