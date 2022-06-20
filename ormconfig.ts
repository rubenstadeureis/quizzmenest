import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions[] = [
  {
    name: 'default',
    type: 'mariadb',
    host: 'localhost',
    port: 49153,
    username: 'root',
    password: 'mariadbpw',
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
